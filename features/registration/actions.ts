// features/registration/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { createEmailVerificationToken } from './helpers'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from './schemas'

// Step 1: Create user account
export async function submitStep1(data: any) {
  try {
    const validated = step1Schema.parse(data)
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    })
    
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' }
    }
    
    // Create user
    const passwordHash = await bcrypt.hash(validated.password, 12)
    
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        passwordHash,
        role: 'USER',
      }
    })
    
    // Create verification token
    const token = await createEmailVerificationToken(user.id)
    
    // Send verification email (implement later)
    // await sendVerificationEmail(user.email, token)
    
    console.log('Verification token:', token) // For testing
    
    return { 
      success: true, 
      userId: user.id,
      message: 'Account created. Please verify your email.' 
    }
    
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create account' }
  }
}

// Step 2: Save personal information
export async function submitStep2(userId: string, data: any) {
  try {
    const validated = step2Schema.parse(data)
    
    await prisma.customerProfile.upsert({
      where: { userId },
      create: {
        userId,
        firstName: validated.firstName,
        middleName: validated.middleName || null,
        lastName: validated.lastName,
        dateOfBirth: new Date(validated.dateOfBirth),
        gender: validated.gender,
        maritalStatus: validated.maritalStatus,
        nationality: validated.nationality,
        phoneNumber: validated.phoneNumber,

        residencyStatus: 'CITIZEN',
        verificationStatus: 'PENDING_REVIEW',
      },
      update: {
        firstName: validated.firstName,
        middleName: validated.middleName || null,
        lastName: validated.lastName,
        dateOfBirth: new Date(validated.dateOfBirth),
        gender: validated.gender,
        maritalStatus: validated.maritalStatus,
        nationality: validated.nationality,
        phoneNumber: validated.phoneNumber,
        residencyStatus: validated.residencyStatus,
      }
    })
    
    return { success: true }
  }catch (error) {
  console.error(error);
  throw error;
}
}

// Step 3: Save identification
export async function submitStep3(userId: string, data: any) {
  try {
    const validated = step3Schema.parse(data)
    
    await prisma.identificationRecord.upsert({
      where: { userId },
      create: {
        userId,
        idType: validated.idType,
        idNumber: validated.idNumber,
      },
      update: {
        idType: validated.idType,
        idNumber: validated.idNumber,
      }
    })
    
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to save identification' }
  }
}

// Step 4: Save residency
export async function submitStep4(userId: string, data: any) {
  try {
    const validated = step4Schema.parse(data)
    
    await prisma.customerProfile.update({
      where: { userId },
      data: {
        residencyStatus: validated.residencyStatus,
        passportNumber: validated.passportNumber || null,
        countryOfCitizenship: validated.countryOfCitizenship || null,
      }
    })
    
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to save residency information' }
  }
}

// Step 5: Save address
export async function submitStep5(userId: string, data: any) {
  try {
    const validated = step5Schema.parse(data)
    
    await prisma.address.upsert({
      where: { userId },
      create: {
        userId,
        residentialAddress: validated.residentialAddress,
        apartmentSuite: validated.apartmentSuite || null,
        city: validated.city,
        state: validated.state,
        country: validated.country,
        postalCode: validated.postalCode || null,
      },
      update: {
        residentialAddress: validated.residentialAddress,
        apartmentSuite: validated.apartmentSuite || null,
        city: validated.city,
        state: validated.state,
        country: validated.country,
        postalCode: validated.postalCode || null,
      }
    })
    
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to save address' }
  }
}

// Step 6: Upload files
export async function submitStep6(userId: string, formData: FormData) {
  try {
    const profilePhoto = formData.get('profilePhoto') as File
    const governmentIdFile = formData.get('governmentIdFile') as File
    
    if (!profilePhoto || !governmentIdFile) {
      return { success: false, error: 'Both files are required' }
    }
    
    // Upload to Cloudinary
    const [photoUrl, idUrl] = await Promise.all([
      uploadToCloudinary(profilePhoto, `banking-sim/users/${userId}/profile`),
      uploadToCloudinary(governmentIdFile, `banking-sim/users/${userId}/documents`),
    ])
    
    // Update profile photo
    await prisma.customerProfile.update({
      where: { userId },
      data: { profilePhoto: photoUrl }
    })
    
    // Update government ID
    await prisma.identificationRecord.update({
      where: { userId },
      data: { governmentIdFile: idUrl }
    })
    
    return { 
      success: true,
      data: { profilePhoto: photoUrl, governmentIdFile: idUrl }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to upload files' }
  }
}

// Final submission
export async function completeRegistration(userId: string) {
  try {
    // Mark profile as pending review
    await prisma.customerProfile.update({
      where: { userId },
      data: { verificationStatus: 'PENDING_REVIEW' }
    })
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to complete registration' }
  }
}