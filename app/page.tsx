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

const suiteLinks = [
  { label: 'Accounts', icon: 'M3 10h18M3 6h18M3 14h18M3 18h18' },
  { label: 'KYC Onboarding', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Transactions', icon: 'M17 9V7a4 4 0 00-8 0v2M5 9h14l1 12H4L5 9z' },
  { label: 'Statements', icon: 'M9 17v-2a4 4 0 014-4h4m-8 6h8m-8 0a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2H9a2 2 0 01-2-2z' },
  { label: 'Admin Panel', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Audit Logs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
]

const features = [
  {
    eyebrow: 'ONBOARDING',
    title: 'Full KYC Simulation',
    description: 'Multi-step registration flow with document capture, identity checks, and status tracking — modeled on real-world onboarding.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    eyebrow: 'CORE BANKING',
    title: 'Virtual Account Management',
    description: 'Open virtual accounts, move simulated balances, and generate transaction histories that behave like a live ledger.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    eyebrow: 'OPERATIONS',
    title: 'Admin & Audit Tooling',
    description: 'A complete back-office panel with role-based access, user management, and a full audit trail for every simulated action.',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
]

export default async function HomePage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-white">
      {/* Top notice bar - Citi-style thin banner pattern */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
          <p className="text-xs font-medium text-primary-800">
            Simulation environment — no real funds are held, moved, or insured.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-primary-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">BankingSim</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#suite" className="text-sm font-medium text-gray-600 hover:text-gray-900">Product Suite</a>
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900">About</a>
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
                    <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - two column, Citi editorial-card pattern */}
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <p className="text-xs font-bold tracking-wider text-primary-700 uppercase mb-4">
                Portfolio &amp; Education Platform
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
                A digital bank,
                <span className="block text-primary-800">built to demonstrate skill.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                BankingSim recreates the full arc of a modern online bank — onboarding,
                accounts, transactions, and admin operations — as a realistic, fully
                simulated environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isLoggedIn && (
                  <>
                    <Link href="/register" className="btn-primary text-base px-6 py-3 text-center">
                      Get Started Free
                    </Link>
                    <Link href="/login" className="btn-secondary text-base px-6 py-3 text-center">
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-4">
                No real accounts, funds, or financial services are involved.
              </p>
            </div>

            {/* Right: mock account preview panel — clearly a UI mock, not a real bank asset */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-transparent rounded-3xl -z-10" />
              <div className="rounded-2xl border border-gray-200 shadow-xl bg-white overflow-hidden">
                <div className="bg-primary-800 px-6 py-4 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">Simulated Checking</span>
                  <span className="text-primary-200 text-xs font-medium px-2 py-0.5 rounded bg-white/10">DEMO</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-1">Available balance</p>
                  <p className="text-3xl font-bold text-gray-900 mb-6">$12,480.55</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Simulated Payroll Deposit', amount: '+$3,200.00' },
                      { label: 'Transfer to Savings (sim)', amount: '−$500.00' },
                      { label: 'Merchant Purchase (sim)', amount: '−$84.20' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-700">{row.label}</span>
                        <span className={row.amount.startsWith('+') ? 'text-green-600 font-medium' : 'text-gray-900 font-medium'}>
                          {row.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product suite icon row - Citi-style icon nav pattern */}
        <section id="suite" className="border-y border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {suiteLinks.map((item) => (
                <a
                  key={item.label}
                  href="#features"
                  className="flex flex-col items-center gap-2 text-center group"
                >
                  <span className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary-400 group-hover:bg-primary-50 transition-colors">
                    <svg className="w-5 h-5 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.icon} />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-800">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Feature cards - editorial card pattern with eyebrow labels */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-wider text-primary-700 uppercase mb-3">
              What's inside
            </p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              A realistic banking stack, end to end
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-7 rounded-xl bg-white border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <p className="text-xs font-bold tracking-wider text-primary-700 uppercase mb-2">
                  {feature.eyebrow}
                </p>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        {!isLoggedIn && (
          <section className="bg-primary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Ready to explore the platform?</h2>
                <p className="text-primary-100 text-sm">Create a free simulated account in under two minutes.</p>
              </div>
              <Link href="/register" className="bg-white text-primary-800 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors whitespace-nowrap">
                Get Started Free
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Footer - Citi-style dark footer with legal disclosure block */}
      <footer id="about" className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#suite" className="text-sm text-gray-400 hover:text-white">Product Suite</a></li>
                <li><a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-sm text-gray-400 hover:text-white">Sign In</Link></li>
                <li><Link href="/register" className="text-sm text-gray-400 hover:text-white">Open an Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-sm text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BankingSim. All rights reserved.
            </p>
          </div>

          {/* Legal disclosure block - Citi footer disclosure pattern */}
          <div className="border-t border-gray-800 pt-6">
            <h5 className="text-white text-sm font-semibold mb-3">Important Disclaimer</h5>
            <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
              BankingSim is a software simulation built for portfolio demonstration and educational
              purposes only. It is not a bank, is not affiliated with any financial institution, and
              is not FDIC insured or insured by any government agency. No real accounts are opened,
              no real funds are held or transferred, and nothing on this site constitutes financial
              advice or a financial service of any kind. All balances, transactions, and account data
              shown are fictional and generated for demonstration purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}