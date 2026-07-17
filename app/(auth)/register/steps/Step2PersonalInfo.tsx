// app/(auth)/register/steps/Step2PersonalInfo.tsx
'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema } from '@/features/registration/schemas'
import { submitStep2 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { toast } from 'sonner'
import { useState } from 'react'

interface Step2PersonalInfoProps {
  userId: string
  onComplete: (data: any) => void
  onBack: () => void
}

export function Step2PersonalInfo({ userId, onComplete, onBack }: Step2PersonalInfoProps) {
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    resolver: zodResolver(step2Schema),
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const result = await submitStep2(userId, data)
      
      if (result.success) {
        toast.success('Personal information saved')
        onComplete(data)
      } else {
        toast.error(result.error || 'Failed to save information')
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
        title: 'Personal Information',
        description: 'Tell us about yourself'
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="firstName"
              label="First Name"
              placeholder="John"
            />
            <FormField
              name="lastName"
              label="Last Name"
              placeholder="Doe"
            />
          </div>

          <FormField
            name="middleName"
            label="Middle Name (Optional)"
            placeholder="Middle name"
          />

        <FormField
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        max={new Date(
          new Date().setFullYear(new Date().getFullYear() - 18)
        )
          .toISOString()
          .split('T')[0]}
      />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select {...methods.register('gender')} className="input-field">
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {methods.formState.errors.gender && (
                <p className="text-xs text-red-600">
                  {methods.formState.errors.gender.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select {...methods.register('maritalStatus')} className="input-field">
                <option value="">Select status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
              {methods.formState.errors.maritalStatus && (
                <p className="text-xs text-red-600">
                  {methods.formState.errors.maritalStatus.message as string}
                </p>
              )}
            </div>
          </div>

          <FormField
            name="nationality"
            label="Nationality"
            placeholder="e.g., United States"
          />

          <FormField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+1 800 000 0000"
          />

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