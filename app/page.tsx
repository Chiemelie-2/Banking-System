// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          BankingSim
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Digital Banking Simulation Platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register" className="btn-primary">
            Open an Account
          </Link>
          <Link href="/login" className="btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}