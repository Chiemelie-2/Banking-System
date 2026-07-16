// app/(customer)/layout.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | BankingSim'
  }
}

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  // Fetch user profile for sidebar
  const profile = await prisma.customerProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      firstName: true,
      lastName: true,
      profilePhoto: true,
      verificationStatus: true,
    }
  })

  const account = await prisma.bankAccount.findFirst({
    where: { userId: session.user.id },
    select: {
      accountNumber: true,
      balance: true,
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar 
        userProfile={profile}
        accountNumber={account?.accountNumber ?? null}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <Header 
          userProfile={profile}
          account={account}
        />
        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}