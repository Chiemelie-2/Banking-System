// app/(customer)/deposit/page.tsx
import { Card } from '@/components/ui/Card'

export default function DepositPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
        <p className="text-gray-600 mt-1">This is a simulation - no real deposits are processed</p>
      </div>

      <Card>
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Simulation Mode</h3>
          <p className="text-sm text-gray-600">
            This is a banking simulation platform. Deposits are processed by administrators for demonstration purposes.
          </p>
        </div>
      </Card>
    </div>
  )
}