// app/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'BankingSim - Digital Banking Simulation Platform',
  description: 'A professional digital banking simulation platform for portfolio and educational use. Experience realistic online banking with virtual accounts.',
  openGraph: {
    title: 'BankingSim - Digital Banking Simulation',
    description: 'Professional digital banking simulation for portfolio and education',
    type: 'website',
    siteName: 'BankingSim',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BankingSim - Digital Banking Simulation',
    description: 'Professional digital banking simulation platform',
  },
}

export default async function HomePage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-primary-800">BankingSim</span>
            </div>
            
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link href="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary">
                    Open an Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Simulation Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Digital Banking
              <span className="block text-primary-800">Simulation Platform</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              A realistic, enterprise-grade banking simulation for portfolio demonstration 
              and educational purposes. Experience complete KYC onboarding, account management, 
              and transaction processing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isLoggedIn && (
                <>
                  <Link href="/register" className="btn-primary text-lg px-8 py-3">
                    Get Started Free
                  </Link>
                  <Link href="/login" className="btn-secondary text-lg px-8 py-3">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
              {[
                {
                  title: 'KYC Onboarding',
                  description: 'Multi-step registration with document verification',
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                },
                {
                  title: 'Virtual Banking',
                  description: 'Account management with virtual balances and transactions',
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  title: 'Admin Dashboard',
                  description: 'Complete admin panel with audit logging and user management',
                  icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
                },
              ].map((feature) => (
                <div key={feature.title} className="text-left p-6 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-16 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">Important Disclaimer</p>
                  <p className="text-xs">
                    BankingSim is a simulation platform designed for portfolio demonstration and educational purposes only. 
                    No real financial transactions are processed. No real money is held or transferred. 
                    This is not a real bank and is not FDIC insured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BankingSim. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}