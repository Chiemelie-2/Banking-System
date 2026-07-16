// app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Stepper } from '@/components/ui/stepper'

import { Step1Credentials } from './steps/Step1Credentials'
import { Step2PersonalInfo } from './steps/Step2PersonalInfo'
import { Step3Identification } from './steps/Step3Identification'
import { Step4Residency } from './steps/Step4Residency'
import { Step5Address } from './steps/Step5Address'
import { Step6Uploads } from './steps/Step6Uploads'
import { Step7Declaration } from './steps/Step7Declaration'

const STEPS = [
  { title: 'Account', description: 'Credentials' },
  { title: 'Personal', description: 'Information' },
  { title: 'ID', description: 'Verification' },
  { title: 'Residency', description: 'Status' },
  { title: 'Address', description: 'Details' },
  { title: 'Documents', description: 'Upload' },
  { title: 'Review', description: 'Submit' },
]

type FormDataType = {
  userId: string
  [key: string]: any
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const [formData, setFormData] = useState<FormDataType>({
    userId: '',
  })

  const handleStepComplete = (stepData: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Credentials
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
          />
        )

      case 1:
        return (
          <Step2PersonalInfo
            userId={formData.userId || ''}
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case 2:
        return (
          <Step3Identification
            userId={formData.userId || ''}
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case 3:
        return (
          <Step4Residency
            userId={formData.userId || ''}
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case 4:
        return (
          <Step5Address
            userId={formData.userId || ''}
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case 5:
        return (
          <Step6Uploads
            userId={formData.userId || ''}
            onComplete={(data: Record<string, any>) => {
              handleStepComplete(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )

      case 6:
        return (
          <Step7Declaration
            userId={formData.userId || ''}
            formData={formData}
            onBack={prevStep}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}