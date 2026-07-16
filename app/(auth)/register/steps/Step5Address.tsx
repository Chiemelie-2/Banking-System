// app/(auth)/register/steps/Step5Address.tsx
'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step5Schema } from '@/features/registration/schemas'
import { submitStep5 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { toast } from 'sonner'
import { useState } from 'react'

interface Step5AddressProps {
  userId: string
  onComplete: (data: any) => void
  onBack: () => void
}

export function Step5Address({ userId, onComplete, onBack }: Step5AddressProps) {
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    resolver: zodResolver(step5Schema),
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const result = await submitStep5(userId, data)
      
      if (result.success) {
        toast.success('Address saved')
        onComplete(data)
      } else {
        toast.error(result.error || 'Failed to save address')
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
        title: 'Address Information',
        description: 'Provide your residential address'
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="residentialAddress"
            label="Residential Address"
            placeholder="123 Main Street"
          />

          <FormField
            name="apartmentSuite"
            label="Apartment/Suite (Optional)"
            placeholder="Apt 4B"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="city"
              label="City"
              placeholder="Los Angeles"
            />
            <FormField
              name="state"
              label="State/Province"
              placeholder="California"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="country"
              label="Country"
              placeholder="United States"
            />
            <FormField
              name="postalCode"
              label="Postal Code (Optional)"
              placeholder="100001"
            />
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