// app/(admin)/layout.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | BankingSim Admin'
  },
  robots: {
    index: false,
    follow: false,
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  // Verify admin role
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }

  // Get admin user info
  const adminUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      role: true,
    }
  })

  // Get pending count for sidebar badge
  const pendingCount = await prisma.customerProfile.count({
    where: { verificationStatus: 'PENDING_REVIEW' }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar 
        adminEmail={adminUser?.email || ''}
        pendingCount={pendingCount}
        role={adminUser?.role || ''}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <AdminHeader email={adminUser?.email || ''} />
        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}