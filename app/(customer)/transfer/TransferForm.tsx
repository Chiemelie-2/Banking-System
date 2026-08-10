// app/(customer)/transfer/TransferForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AmountInput } from '@/components/forms/AmountInput'
import { TransactionReceipt } from '@/components/forms/TransactionReceipt'
import { transferFunds } from '@/features/transactions/actions'
import { formatCurrency, maskAccountNumber } from '@/lib/utils'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const transferSchema = z.object({
  toAccount: z.string()
    .min(1, 'Account number is required')
    .regex(/^\d{10}$/, 'Enter a valid 10-digit account number'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Enter a valid amount')
    .refine((val) => parseFloat(val) <= 50000, 'Maximum transfer is $50,000'),
  description: z.string().max(200).optional(),
})

type TransferFormValues = z.infer<typeof transferSchema>

interface TransferFormProps {
  fromAccountNumber: string
  fromBalance: number
}

export function TransferForm({ fromAccountNumber, fromBalance }: TransferFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingValues, setPendingValues] = useState<TransferFormValues | null>(null)
  const [receipt, setReceipt] = useState<any>(null)

  const methods = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { toAccount: '', amount: '', description: '' },
  })

  const { register, handleSubmit, watch, formState: { errors }, reset } = methods

  const watchedAmount = watch('amount')
  const watchedToAccount = watch('toAccount')

  const onSubmit = (data: TransferFormValues) => {
    if (parseFloat(data.amount) > fromBalance) {
      toast.error('Insufficient balance for this transfer.')
      return
    }
    setPendingValues(data)
    setShowConfirmation(true)
  }

  const confirmTransfer = async () => {
    if (!pendingValues) return
    setIsSubmitting(true)

    const result = await transferFunds({
      toAccountNumber: pendingValues.toAccount,
      amount: parseFloat(pendingValues.amount),
      description: pendingValues.description,
    })

    setIsSubmitting(false)

    if (!result.success) {
      toast.error(result.error)
      setShowConfirmation(false)
      return
    }

    setReceipt({
      type: 'transfer',
      amount: parseFloat(pendingValues.amount),
      fromAccount: maskAccountNumber(fromAccountNumber),
      toAccount: `****${result.toAccountLast4}`,
      description: pendingValues.description || 'Funds Transfer',
      reference: result.reference,
      date: new Date(),
    })

    setShowConfirmation(false)
    setShowReceipt(true)
    router.refresh()
  }

  const handleNewTransaction = () => {
    setShowReceipt(false)
    setReceipt(null)
    setPendingValues(null)
    reset()
  }

  if (showReceipt && receipt) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <TransactionReceipt
          {...receipt}
          onClose={() => (window.location.href = '/dashboard')}
          onNewTransaction={handleNewTransaction}
        />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
            <p className="text-sm text-gray-500">Send funds to another account on this platform</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showConfirmation ? (
          <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <Card>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* From Account — real data */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">From Account</p>
                    <p className="text-sm font-medium text-gray-900">{maskAccountNumber(fromAccountNumber)}</p>
                    <p className="text-xs text-gray-500 mt-1">Available balance: {formatCurrency(fromBalance)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Account Number
                    </label>
                    <input
                      {...register('toAccount')}
                      type="text"
                      maxLength={10}
                      placeholder="Enter 10-digit account number"
                      className="input-field font-mono"
                    />
                    {errors.toAccount && (
                      <p className="text-xs text-red-600 mt-1">{errors.toAccount.message}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Must be an active account number on this platform.
                    </p>
                  </div>

                  <div>
                    <AmountInput
                      label="Transfer Amount"
                      placeholder="0.00"
                      error={errors.amount?.message}
                      {...register('amount')}
                    />
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {[50, 100, 250, 500, 1000].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => methods.setValue('amount', amount.toString(), { shouldValidate: true })}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            watchedAmount === amount.toString()
                              ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                              : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:border-gray-300'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      {...register('description')}
                      placeholder="What's this transfer for?"
                      rows={2}
                      className="input-field resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg py-3"
                    disabled={!watchedAmount || !watchedToAccount}
                  >
                    Review Transfer
                  </Button>
                </form>
              </FormProvider>
            </Card>
          </motion.div>
        ) : (
          pendingValues && (
            <motion.div key="confirmation" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Confirm Transfer</h3>
                    <p className="text-sm text-gray-500 mt-1">Please review the details below</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-sm font-medium">{maskAccountNumber(fromAccountNumber)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">To</span>
                      <span className="text-sm font-medium">****{pendingValues.toAccount.slice(-4)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Amount</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(parseFloat(pendingValues.amount))}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowConfirmation(false)}>
                      Edit
                    </Button>
                    <Button className="flex-1" onClick={confirmTransfer} isLoading={isSubmitting}>
                      Confirm Transfer
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}