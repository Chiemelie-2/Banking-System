// app/(auth)/register/steps/Step6Uploads.tsx
'use client'

import { useState } from 'react'
import { submitStep6 } from '@/features/registration/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileUpload } from '@/components/ui/FileUpload'
import { toast } from 'sonner'

interface Step6UploadsProps {
  userId: string
  onComplete: (data: any) => void
  onBack: () => void
}

export function Step6Uploads({ userId, onComplete, onBack }: Step6UploadsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [governmentIdFile, setGovernmentIdFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateFiles = () => {
    const newErrors: Record<string, string> = {}
    
    if (!profilePhoto) {
      newErrors.profilePhoto = 'Profile photo is required'
    }
    if (!governmentIdFile) {
      newErrors.governmentIdFile = 'Government ID is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateFiles()) return
    
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('profilePhoto', profilePhoto!)
      formData.append('governmentIdFile', governmentIdFile!)
      
      const result = await submitStep6(userId, formData)
      
      if (result.success) {
        toast.success('Documents uploaded successfully')
        onComplete({ 
          profilePhoto: result.data?.profilePhoto,
          governmentIdFile: result.data?.governmentIdFile 
        })
      } else {
        toast.error(result.error || 'Failed to upload documents')
      }
    } catch (error) {
      toast.error('Failed to upload files. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      header={{
        title: 'Document Upload',
        description: 'Upload your profile photo and government ID'
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FileUpload
          onFileSelect={setProfilePhoto}
          accept="image/*"
          label="Profile Photo"
          error={errors.profilePhoto}
        />

        <FileUpload
          onFileSelect={setGovernmentIdFile}
          accept="image/*,.pdf"
          label="Government-Issued ID"
          error={errors.governmentIdFile}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Requirements:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Profile photo must be a clear, passport-style photo</li>
                <li>ID must be valid and clearly visible</li>
                <li>Maximum file size: 5MB each</li>
                <li>Accepted formats: JPG, PNG, WebP (PDF for ID)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1" isLoading={isLoading}>
            Upload & Continue
          </Button>
        </div>
      </form>
    </Card>
  )
}