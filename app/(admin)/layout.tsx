// app/(admin)/layout.tsx
// app/(admin)/layout.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }

  const [pendingCount, pendingDepositCount] = await Promise.all([
    prisma.customerProfile.count({
      where: { verificationStatus: { in: ['PENDING_REVIEW', 'IN_REVIEW'] } },
    }),
    prisma.depositRequest.count({ where: { status: 'PENDING' } }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        adminEmail={session.user.email || ''}
        pendingCount={pendingCount}
        pendingDepositCount={pendingDepositCount}
        role={session.user.role}
      />
      
      <div className="lg:pl-64">
        <AdminHeader email={session.user.email || ''} />
        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}