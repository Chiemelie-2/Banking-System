// features/transactions/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'
import { revalidatePath } from 'next/cache'

function generateTransactionReference(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = randomBytes(6).toString('hex').toUpperCase()
  return `TXN-${datePart}-${randomPart}`
}

export type TransferResult =
  | { success: true; reference: string; newBalance: number; toAccountLast4: string }
  | { success: false; error: string }

/**
 * Moves virtual funds between two BankAccounts that already exist in the
 * database. Both legs (debit sender, credit recipient) happen inside a
 * single transaction with row-level locks, in a fixed lock order (lowest
 * account id first) to avoid deadlocking against a reverse-direction
 * transfer happening concurrently.
 */
export async function transferFunds(input: {
  toAccountNumber: string
  amount: number
  description?: string
}): Promise<TransferResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'You must be signed in to transfer funds.' }
  }

  const amount = Number(input.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, error: 'Enter a valid amount.' }
  }
  if (amount > 50000) {
    return { success: false, error: 'Maximum transfer is $50,000.' }
  }

  const toAccountNumber = input.toAccountNumber.trim()

  try {
    const result = await prisma.$transaction(async (tx) => {
      const senderAccount = await tx.bankAccount.findFirst({
        where: { userId: session.user.id, status: 'ACTIVE' },
      })
      if (!senderAccount) {
        throw new Error('No active account found for your profile.')
      }

      const recipientAccount = await tx.bankAccount.findUnique({
        where: { accountNumber: toAccountNumber },
      })
      if (!recipientAccount || recipientAccount.status !== 'ACTIVE') {
        throw new Error('Recipient account not found or inactive.')
      }
      if (recipientAccount.id === senderAccount.id) {
        throw new Error('You cannot transfer to your own account.')
      }

      // Lock both rows in a fixed order (by id) to avoid deadlocks when two
      // transfers between the same pair of accounts run concurrently in
      // opposite directions.
      const [firstId, secondId] =
        senderAccount.id < recipientAccount.id
          ? [senderAccount.id, recipientAccount.id]
          : [recipientAccount.id, senderAccount.id]

      await tx.$queryRaw`SELECT id FROM bank_accounts WHERE id = ${firstId} FOR UPDATE`
      await tx.$queryRaw`SELECT id FROM bank_accounts WHERE id = ${secondId} FOR UPDATE`

      const freshSender = await tx.bankAccount.findUniqueOrThrow({ where: { id: senderAccount.id } })
      const freshRecipient = await tx.bankAccount.findUniqueOrThrow({ where: { id: recipientAccount.id } })

      const transferAmount = new Prisma.Decimal(amount)
      const senderBalance = new Prisma.Decimal(freshSender.balance)
      const recipientBalance = new Prisma.Decimal(freshRecipient.balance)

      if (senderBalance.lessThan(transferAmount)) {
        throw new Error('Insufficient balance for this transfer.')
      }

      const newSenderBalance = senderBalance.minus(transferAmount)
      const newRecipientBalance = recipientBalance.plus(transferAmount)
      const reference = generateTransactionReference()
      const description = input.description?.trim() || 'Funds Transfer'

      await tx.bankAccount.update({
        where: { id: freshSender.id },
        data: { balance: newSenderBalance },
      })
      await tx.bankAccount.update({
        where: { id: freshRecipient.id },
        data: { balance: newRecipientBalance },
      })

      await tx.transaction.create({
        data: {
          accountId: freshSender.id,
          transactionType: 'TRANSFER',
          amount: transferAmount,
          description: `${description} — to ${freshRecipient.accountNumber.slice(-4)}`,
          status: 'COMPLETED',
          reference: `${reference}-OUT`,
        },
      })
      await tx.transaction.create({
        data: {
          accountId: freshRecipient.id,
          transactionType: 'TRANSFER',
          amount: transferAmount,
          description: `${description} — from ${freshSender.accountNumber.slice(-4)}`,
          status: 'COMPLETED',
          reference: `${reference}-IN`,
        },
      })

      return {
        reference,
        newBalance: newSenderBalance.toNumber(),
        toAccountLast4: freshRecipient.accountNumber.slice(-4),
      }
    })

    revalidatePath('/dashboard')
    revalidatePath('/transactions')

    return { success: true, ...result }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Transfer failed. Please try again.'
    return { success: false, error: message }
  }
}