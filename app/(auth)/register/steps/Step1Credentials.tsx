// app/(auth)/register/steps/Step1Credentials.tsx
'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema } from '@/features/registration/schemas'
import { submitStep1 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { PasswordStrength } from '@/components/forms/PasswordStrength'
import { toast } from 'sonner'
import { useState } from 'react'

interface Step1CredentialsProps {
  onComplete: (data: any) => void
}

export function Step1Credentials({ onComplete }: Step1CredentialsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')

  const methods = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const result = await submitStep1(data)
      
      if (result.success) {
        toast.success('Account created! Please check your email for verification.')
        onComplete({ ...data, userId: result.userId })
      } else {
        toast.error(result.error || 'Failed to create account')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      header={{
        title: 'Create your account',
        description: 'Start with your email and a secure password'
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
          />

          <div className="space-y-1">
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Create a strong password"
            />
            <PasswordStrength password={password} />
          </div>

          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Password requirements:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Continue
          </Button>
        </form>
      </FormProvider>
    </Card>
  )
}