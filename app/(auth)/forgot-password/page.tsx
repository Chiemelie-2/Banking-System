// app/(auth)/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import Link from 'next/link'

const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const methods = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    // We'll implement the actual API call in Stage 3
    console.log('Password reset for:', data.email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card
        header={{
          title: 'Check your email',
          description: 'We sent a password reset link to your email address'
        }}
      >
        <div className="text-center py-4">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              try again
            </button>
          </p>
          <Link href="/login" className="btn-secondary inline-block">
            Back to Sign In
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card
      header={{
        title: 'Reset your password',
        description: 'Enter your email and we\'ll send you a reset link'
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

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </FormProvider>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Back to Sign In
        </Link>
      </div>
    </Card>
  )
}