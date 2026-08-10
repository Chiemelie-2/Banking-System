// app/(customer)/transfer/page.tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { TransferForm } from './TransferForm'

export default async function TransferPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const account = await prisma.bankAccount.findFirst({
    where: { userId: session.user.id, status: 'ACTIVE' },
  })

  if (!account) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">No Active Account</h1>
        <p className="text-sm text-gray-600">
          You need a verified, active account before you can transfer funds.
        </p>
      </div>
    )
  }

  return (
    <TransferForm
      fromAccountNumber={account.accountNumber}
      fromBalance={account.balance.toNumber()}
    />
  )
}