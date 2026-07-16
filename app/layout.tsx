// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { SkipLink } from '@/components/ui/SkipLink'
import './globals.css'

const inter = {
  className: '',
}

export const metadata: Metadata = {
  title: {
    default: 'BankingSim - Digital Banking Simulation',
    template: '%s | BankingSim'
  },
  description: 'A professional digital banking simulation platform for portfolio and educational use.',
  keywords: ['banking', 'simulation', 'fintech', 'portfolio', 'demo'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <SkipLink />
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  )
}