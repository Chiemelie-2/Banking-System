// app/(customer)/transfer/page.tsx
'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AmountInput } from '@/components/forms/AmountInput'
import { TransactionReceipt } from '@/components/forms/TransactionReceipt'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const transferSchema = z.object({
  toAccount: z.string()
    .min(1, 'Account number is required')
    .regex(/^\d{10}$/, 'Enter a valid 10-digit account number'),
  routingNumber: z.string()
    .min(1, 'Routing number is required')
    .regex(/^\d{9}$/, 'Enter a valid 9-digit routing number'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Enter a valid amount')
    .refine((val) => parseFloat(val) <= 50000, 'Maximum transfer is $50,000'),
  description: z.string().max(200).optional(),
})

type TransferForm = z.infer<typeof transferSchema>

export default function TransferPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<any>(null)

  const methods = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      toAccount: '',
      routingNumber: '',
      amount: '',
      description: '',
    }
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = methods

  const watchedAmount = watch('amount')
  const watchedToAccount = watch('toAccount')

  const onSubmit = (data: TransferForm) => {
    setTransactionDetails(data)
    setShowConfirmation(true)
  }

  const confirmTransfer = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setTransactionDetails({
      type: 'transfer',
      amount: parseFloat(transactionDetails.amount),
      fromAccount: '****4582',
      toAccount: `****${transactionDetails.toAccount.slice(-4)}`,
      description: transactionDetails.description || 'Funds Transfer',
      reference: `TRF-${Date.now().toString(36).toUpperCase()}`,
      date: new Date(),
    })
    
    setShowConfirmation(false)
    setShowReceipt(true)
    setIsSubmitting(false)
  }

  const handleNewTransaction = () => {
    setShowReceipt(false)
    setTransactionDetails(null)
    reset()
  }

  if (showReceipt && transactionDetails) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <TransactionReceipt
          {...transactionDetails}
          onClose={() => window.location.href = '/dashboard'}
          onNewTransaction={handleNewTransaction}
        />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
            <p className="text-sm text-gray-500">Send virtual funds to another account</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showConfirmation ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* From Account */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">From Account</p>
                    <p className="text-sm font-medium text-gray-900">Primary Checking</p>
                    <p className="text-xs text-gray-500 font-mono">****4582</p>
                  </div>

                  {/* To Account */}
                  <div className="space-y-4">
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Routing Number
                      </label>
                      <input
                        {...register('routingNumber')}
                        type="text"
                        maxLength={9}
                        placeholder="Enter 9-digit routing number"
                        className="input-field font-mono"
                      />
                      {errors.routingNumber && (
                        <p className="text-xs text-red-600 mt-1">{errors.routingNumber.message}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Use routing number: 091000019 for simulation
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <AmountInput
                      label="Transfer Amount"
                      placeholder="0.00"
                      error={errors.amount?.message}
                      {...register('amount')}
                    />
                    
                    {/* Quick Amounts */}
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

                  {/* Description */}
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

                  {/* Simulation Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-yellow-700">
                      <strong>Simulation:</strong> Transfers are processed by an administrator for demonstration purposes only.
                    </p>
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
          /* Confirmation Step */
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
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
                    <span className="text-sm font-medium">****4582</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">To</span>
                    <span className="text-sm font-medium">****{transactionDetails.toAccount.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Routing</span>
                    <span className="text-sm font-medium">{transactionDetails.routingNumber}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Amount</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${parseFloat(transactionDetails.amount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={confirmTransfer}
                    isLoading={isSubmitting}
                  >
                    Confirm Transfer
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}