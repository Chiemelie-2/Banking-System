// app/(auth)/register/steps/Step3Identification.tsx
'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema } from '@/features/registration/schemas'
import { submitStep3 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { toast } from 'sonner'
import { useState } from 'react'

interface Step3IdentificationProps {
  userId: string
  onComplete: (data: any) => void
  onBack: () => void
}

const ID_TYPES = [
  { value: 'NIN', label: 'National Identification Number (NIN)' },
  { value: 'INTERNATIONAL_PASSPORT', label: 'International Passport' },
  { value: 'DRIVERS_LICENSE', label: "Driver's License" },
  { value: 'VOTERS_CARD', label: "Voter's Card" },
  { value: 'RESIDENCE_PERMIT', label: 'Residence Permit' },
]

export function Step3Identification({ userId, onComplete, onBack }: Step3IdentificationProps) {
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    resolver: zodResolver(step3Schema),
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const result = await submitStep3(userId, data)
      
      if (result.success) {
        toast.success('Identification saved')
        onComplete(data)
      } else {
        toast.error(result.error || 'Failed to save identification')
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
        title: 'Identification',
        description: 'Provide a valid government-issued ID'
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Identification Type
            </label>
            <select {...methods.register('idType')} className="input-field">
              <option value="">Select identification type</option>
              {ID_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {methods.formState.errors.idType && (
              <p className="text-xs text-red-600">
                {methods.formState.errors.idType.message as string}
              </p>
            )}
          </div>

          <FormField
            name="idNumber"
            label="Identification Number"
            placeholder="Enter your ID number"
            hint="Enter the number exactly as it appears on your document"
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Important</p>
                <p className="text-xs mt-1">
                  You will need to upload a photo of this ID in the next steps. 
                  Make sure the ID is valid and not expired.
                </p>
              </div>
            </div>
          </div>

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