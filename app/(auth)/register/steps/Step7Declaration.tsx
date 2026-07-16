// app/(auth)/register/steps/Step7Declaration.tsx
'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step7Schema } from '@/features/registration/schemas'
import { completeRegistration } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Step7DeclarationProps {
  userId: string
  formData: any
  onBack: () => void
}

export function Step7Declaration({ userId, formData, onBack }: Step7DeclarationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const methods = useForm({
    resolver: zodResolver(step7Schema),
  })

  const onSubmit = async () => {
    setIsLoading(true)
    
    try {
      const result = await completeRegistration(userId)
      
      if (result.success) {
        toast.success('Registration complete! Your account is pending review.')
        router.push('/login?registered=true')
      } else {
        toast.error(result.error || 'Failed to complete registration')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  // Format data for review
  const reviewSections = [
    {
      title: 'Account',
      items: [
        { label: 'Email', value: formData.email },
      ]
    },
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: `${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`.trim() },
        { label: 'Date of Birth', value: formData.dateOfBirth },
        { label: 'Gender', value: formData.gender },
        { label: 'Marital Status', value: formData.maritalStatus },
        { label: 'Nationality', value: formData.nationality },
        { label: 'Phone', value: formData.phoneNumber },
      ]
    },
    {
      title: 'Identification',
      items: [
        { label: 'ID Type', value: formData.idType },
        { label: 'ID Number', value: formData.idNumber },
      ]
    },
    {
      title: 'Residency',
      items: [
        { label: 'Status', value: formData.residencyStatus },
        ...(formData.residencyStatus === 'NON_RESIDENT' ? [
          { label: 'Passport Number', value: formData.passportNumber },
          { label: 'Country of Citizenship', value: formData.countryOfCitizenship },
        ] : []),
      ]
    },
    {
      title: 'Address',
      items: [
        { label: 'Address', value: formData.residentialAddress },
        { label: 'City', value: formData.city },
        { label: 'State', value: formData.state },
        { label: 'Country', value: formData.country },
      ]
    },
  ]

  return (
    <Card
      header={{
        title: 'Review & Submit',
        description: 'Please verify all information before submitting'
      }}
    >
      {/* Review Sections */}
      <div className="space-y-6 mb-6">
        {reviewSections.map((section) => (
          <div key={section.title} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{section.title}</h3>
            <dl className="space-y-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt className="text-sm text-gray-500">{item.label}</dt>
                  <dd className="text-sm text-gray-900 font-medium">{item.value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
            <input
              type="checkbox"
              {...methods.register('termsAccepted')}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                I accept the Terms and Conditions
              </p>
              <p className="text-xs text-gray-500 mt-1">
                By checking this box, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a> and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>.
                This is a simulation platform and no real financial transactions will be processed.
              </p>
            </div>
          </label>
          {methods.formState.errors.termsAccepted && (
            <p className="text-xs text-red-600">
              {methods.formState.errors.termsAccepted.message as string}
            </p>
          )}

          {/* Declaration Checkbox */}
          <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
            <input
              type="checkbox"
              {...methods.register('declarationConfirmed')}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                I confirm all information is accurate
              </p>
              <p className="text-xs text-gray-500 mt-1">
                I declare that all information provided is true and accurate to the best of my knowledge.
                I understand that providing false information may result in account suspension.
              </p>
            </div>
          </label>
          {methods.formState.errors.declarationConfirmed && (
            <p className="text-xs text-red-600">
              {methods.formState.errors.declarationConfirmed.message as string}
            </p>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              Submit Application
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}