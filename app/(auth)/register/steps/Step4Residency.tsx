// app/(auth)/register/steps/Step4Residency.tsx
'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step4Schema } from '@/features/registration/schemas'
import { submitStep4 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { toast } from 'sonner'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Step4ResidencyProps {
  userId: string
  onComplete: (data: any) => void
  onBack: () => void
}

export function Step4Residency({ userId, onComplete, onBack }: Step4ResidencyProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [residencyStatus, setResidencyStatus] = useState<string>('')

  const methods = useForm({
    resolver: zodResolver(step4Schema),
  })

  const watchResidency = methods.watch('residencyStatus')
  const isNonResident = watchResidency === 'NON_RESIDENT'

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const result = await submitStep4(userId, data)
      
      if (result.success) {
        toast.success('Residency information saved')
        onComplete(data)
      } else {
        toast.error(result.error || 'Failed to save residency')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      header={{
        title: 'Residency Status',
        description: 'Tell us about your residency status'
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            {[
              { value: 'CITIZEN', label: 'Citizen', description: 'You are a citizen of this country' },
              { value: 'RESIDENT', label: 'Resident', description: 'You reside in this country but are not a citizen' },
              { value: 'NON_RESIDENT', label: 'Non-Resident', description: 'You live outside this country' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  watchResidency === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...methods.register('residencyStatus')}
                  className="mt-1 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
          {methods.formState.errors.residencyStatus && (
            <p className="text-xs text-red-600">
              {methods.formState.errors.residencyStatus.message as string}
            </p>
          )}

          <AnimatePresence>
            {isNonResident && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Additional Information for Non-Residents
                  </p>
                  <div className="space-y-4">
                    <FormField
                      name="passportNumber"
                      label="Passport Number"
                      placeholder="Enter your passport number"
                    />
                    <FormField
                      name="countryOfCitizenship"
                      label="Country of Citizenship"
                      placeholder="e.g., Nigeria"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}