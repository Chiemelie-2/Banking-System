// app/(admin)/admin/dashboard/page.tsx

import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { StatsCard } from '@/components/admin/StatsCard'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { formatCurrency } from '@/lib/utils'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of your banking simulation platform
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <StatsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        }
      >
        <RecentActivitySection />
      </Suspense>
    </div>
  )
}

async function StatsSection() {
  const [
    totalUsers,
    activeUsers,
    pendingVerifications,
    totalBalances
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { status: 'ACTIVE' }
    }),
    prisma.customerProfile.count({
      where: {
        verificationStatus: 'PENDING_REVIEW'
      }
    }),
    prisma.bankAccount.aggregate({
      _sum: {
        balance: true
      }
    })
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Users"
        value={totalUsers}
        description={`${activeUsers} active`}
      />

      <StatsCard
        title="Pending Reviews"
        value={pendingVerifications}
        description="KYC verification needed"
      />

      <StatsCard
        title="Total Balances"
        value={formatCurrency(
          Number(totalBalances._sum.balance || 0)
        )}
        description="Across all accounts"
      />

      <StatsCard
        title="Audit Logs"
        value="Active"
        description="System monitoring"
      />
    </div>
  )
}

async function RecentActivitySection() {
  const [recentUsers, recentTransactions] =
    await Promise.all([
      prisma.user.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          profile: true
        }
      }),

      prisma.transaction.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          account: {
            include: {
              user: {
                include: {
                  profile: true
                }
              }
            }
          }
        }
      })
    ])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Users */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Recent Users
          </h3>
        </div>

        <div className="p-6">
          {recentUsers.length > 0 ? (
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {user.profile?.firstName}{' '}
                      {user.profile?.lastName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <span className="text-xs">
                    {user.profile?.verificationStatus ??
                      'No Profile'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No users yet
            </p>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Recent Transactions
          </h3>
        </div>

        <div className="p-6">
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {txn.description}
                    </p>

                    <p className="text-xs text-gray-500">
                      {
                        txn.account.user.profile
                          ?.firstName
                      }{' '}
                      • {txn.account.accountNumber}
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    {formatCurrency(
                      Number(txn.amount)
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}