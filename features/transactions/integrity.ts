// features/transactions/integrity.ts
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function adjustBalance(
  accountId: string,
  amount: number,
  type: 'CREDIT' | 'DEBIT',
  description: string,
  adminId: string,
  ipAddress?: string
) {
  // NEVER update balance directly - always use transaction
  return await prisma.$transaction(async (tx) => {
    // Lock the account row
    const account = await tx.bankAccount.findUnique({
      where: { id: accountId },
      select: { balance: true, userId: true }
    })
    
    if (!account) throw new Error('Account not found')
    
    const currentBalance = Number(account.balance)
    const newBalance = type === 'CREDIT' 
      ? currentBalance + amount 
      : currentBalance - amount
    
    if (newBalance < 0) {
      throw new Error('Insufficient virtual balance')
    }
    
    // Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        accountId,
        transactionType: type,
        amount,
        description,
        status: 'COMPLETED',
        createdByAdmin: adminId
      }
    })
    
    // Update balance within same transaction
    await tx.bankAccount.update({
      where: { id: accountId },
      data: { balance: newBalance }
    })
    
    // Create audit log
    await tx.auditLog.create({
      data: {
        adminId,
        action: type === 'CREDIT' ? 'ADD_FUNDS' : 'DEDUCT_FUNDS',
        targetUserId: account.userId,
        details: { accountId, amount, newBalance, transactionId: transaction.id },
        ipAddress
      }
    })
    
    return { transaction, newBalance }
  })
}