// features/admin/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { generateCustomerId, generateAccountNumber, ROUTING_NUMBER } from '@/features/accounts/generator'
import { sendAccountApprovedEmail, sendKYCRejectedEmail } from '@/lib/resend'

// Approve customer KYC
export async function approveCustomer(userId: string) {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    throw new Error('Unauthorized')
  }

  return await prisma.$transaction(async (tx) => {
    // Get user details first
    const user = await tx.customerProfile.findUnique({
      where: { userId },
      include: { user: { select: { email: true } } }
    })

    if (!user) throw new Error('User not found')

    // Update verification status
    await tx.customerProfile.update({
      where: { userId },
      data: { verificationStatus: 'APPROVED' }
    })

    // Generate unique customer ID
    let customerId: string
    let exists = true
    do {
      customerId = generateCustomerId()
      exists = !!(await tx.bankAccount.findUnique({ where: { customerId } }))
    } while (exists)

    // Generate unique account number
    let accountNumber: string
    do {
      accountNumber = generateAccountNumber()
      exists = !!(await tx.bankAccount.findUnique({ where: { accountNumber } }))
    } while (exists)

    // Create bank account
    const account = await tx.bankAccount.create({
      data: {
        userId,
        customerId,
        accountNumber,
        routingNumber: ROUTING_NUMBER,
        balance: 0.00,
        accountType: 'CHECKING',
        status: 'ACTIVE'
      }
    })

    // Create audit log
    await tx.auditLog.create({
      data: {
        adminId: session.user.id!,
        action: 'APPROVE_CUSTOMER',
        targetUserId: userId,
        details: { customerId, accountNumber }
      }
    })

    // Send approval email (don't await - fire and forget)
    sendAccountApprovedEmail(user.user.email, accountNumber, user.firstName)
      .catch(err => console.error('Failed to send approval email:', err))

    revalidatePath('/admin/verifications')
    revalidatePath('/admin/users')
    
    return { success: true, account }
  })
}

// Update rejectCustomer function
export async function rejectCustomer(userId: string, reason: string) {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    throw new Error('Unauthorized')
  }

  return await prisma.$transaction(async (tx) => {
    const user = await tx.customerProfile.findUnique({
      where: { userId },
      include: { user: { select: { email: true } } }
    })

    if (!user) throw new Error('User not found')

    await tx.customerProfile.update({
      where: { userId },
      data: { verificationStatus: 'REJECTED' }
    })

    await tx.auditLog.create({
      data: {
        adminId: session.user.id!,
        action: 'REJECT_CUSTOMER',
        targetUserId: userId,
        details: { reason }
      }
    })

    // Send rejection email
    sendKYCRejectedEmail(user.user.email, user.firstName, reason)
      .catch(err => console.error('Failed to send rejection email:', err))

    revalidatePath('/admin/verifications')
    return { success: true }
  })
}

// Adjust balance (add or deduct)
export async function adjustBalance(
  accountId: string,
  amount: number,
  type: 'CREDIT' | 'DEBIT',
  description: string
) {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    throw new Error('Unauthorized')
  }

  return await prisma.$transaction(async (tx) => {
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
      throw new Error('Insufficient balance')
    }

    // Create transaction
    const transaction = await tx.transaction.create({
      data: {
        accountId,
        transactionType: type,
        amount,
        description,
        status: 'COMPLETED',
        createdByAdmin: session.user.id,
        reference: `ADM-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase()
      }
    })

    // Update balance
    await tx.bankAccount.update({
      where: { id: accountId },
      data: { balance: newBalance }
    })

    // Audit log
    await tx.auditLog.create({
      data: {
        adminId: session.user.id!,
        action: type === 'CREDIT' ? 'ADD_FUNDS' : 'DEDUCT_FUNDS',
        targetUserId: account.userId,
        details: { 
          accountId, 
          amount, 
          previousBalance: currentBalance,
          newBalance, 
          transactionId: transaction.id 
        }
      }
    })

    revalidatePath('/admin/balances')
    revalidatePath(`/admin/users/${account.userId}`)
    
    return { success: true, transaction, newBalance }
  })
}

// Suspend or activate user
export async function toggleUserStatus(userId: string, newStatus: 'ACTIVE' | 'SUSPENDED') {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    throw new Error('Unauthorized')
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { status: newStatus }
    })

    if (newStatus === 'SUSPENDED') {
      // Suspend all accounts
      await tx.bankAccount.updateMany({
        where: { userId },
        data: { status: 'SUSPENDED' }
      })
    } else {
      // Activate accounts
      await tx.bankAccount.updateMany({
        where: { userId },
        data: { status: 'ACTIVE' }
      })
    }

    await tx.auditLog.create({
      data: {
        adminId: session.user.id!,
        action: newStatus === 'SUSPENDED' ? 'SUSPEND_USER' : 'ACTIVATE_USER',
        targetUserId: userId,
      }
    })
  })

  revalidatePath('/admin/users')
  return { success: true }
}