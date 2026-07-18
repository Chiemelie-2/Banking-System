// features/registration/schemas.ts
import { z } from 'zod'

// features/registration/schemas.ts


// Step 1: Account Credentials
export const step1Schema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Step 2: Personal Information
export const step2Schema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name too long')
    .regex(/^[a-zA-Z\s-']+$/, 'First name contains invalid characters'),
  middleName: z.string()
    .max(50, 'Middle name too long')
    .regex(/^[a-zA-Z\s-']*$/, 'Middle name contains invalid characters')
    .optional()
    .or(z.literal('')),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name too long')
    .regex(/^[a-zA-Z\s-']+$/, 'Last name contains invalid characters'),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const dob = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 18
      }
      return age >= 18
    }, 'You must be at least 18 years old'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    error: 'Please select your gender',
  }),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
    error: 'Please select your marital status',
  }),
  nationality: z.string()
    .min(1, 'Nationality is required'),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s()-]{10,}$/, 'Please enter a valid phone number'),
})

// ... continue for all 7 steps

// Step 3: Identification
export const step3Schema = z.object({
  idType: z.enum([
    'NIN', 
    'INTERNATIONAL_PASSPORT', 
    'DRIVERS_LICENSE', 
    'VOTERS_CARD', 
    'RESIDENCE_PERMIT'
  ], {
    error: 'Please select identification type',
  }),
  idNumber: z.string()
    .min(1, 'ID number is required')
    .max(50, 'ID number too long')
    .regex(/^[a-zA-Z0-9-]+$/, 'ID number contains invalid characters'),
})

// Step 4: Residency Status
export const step4Schema = z.object({
  residencyStatus: z.enum(['CITIZEN', 'RESIDENT', 'NON_RESIDENT'], {
    error: 'Please select your residency status',
  }),
  passportNumber: z.string()
    .optional()
    .or(z.literal('')),
  countryOfCitizenship: z.string()
    .optional()
    .or(z.literal('')),
}).refine((data) => {
  // If non-resident, passport and citizenship are required
  if (data.residencyStatus === 'NON_RESIDENT') {
    return data.passportNumber && data.passportNumber.length > 0 &&
           data.countryOfCitizenship && data.countryOfCitizenship.length > 0
  }
  return true
}, {
  message: 'Passport number and country of citizenship are required for non-residents',
  path: ['passportNumber'],
})

// Step 5: Address Information
export const step5Schema = z.object({
  residentialAddress: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address too long'),
  apartmentSuite: z.string()
    .max(100, 'Apartment/Suite too long')
    .optional()
    .or(z.literal('')),
  city: z.string()
    .min(2, 'City is required')
    .max(100, 'City name too long'),
  state: z.string()
    .min(2, 'State/Province is required')
    .max(100, 'State name too long'),
  country: z.string()
    .min(2, 'Country is required')
    .max(100, 'Country name too long'),
  postalCode: z.string()
    .max(20, 'Postal code too long')
    .optional()
    .or(z.literal('')),
})

// Step 6: Uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_DOC_TYPES = [...ACCEPTED_IMAGE_TYPES, 'application/pdf']

export const step6Schema = z.object({
  profilePhoto: z.instanceof(File, { message: 'Profile photo is required' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp files are accepted'
    ),
  governmentIdFile: z.instanceof(File, { message: 'Government ID is required' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File must be less than 5MB')
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf files are accepted'
    ),
})

// Step 7: Terms & Declaration
// Step 7: Terms & Declaration
export const step7Schema = z.object({
  termsAccepted: z.literal(true, {
    error: 'You must accept the terms and conditions',
  }),
  declarationConfirmed: z.literal(true, {
    error: 'You must confirm the information is accurate',
  }),
})

// Combined type for all form data
export type RegistrationFormData = {
  // Step 1
  email: string
  password: string
  confirmPassword: string
  // Step 2
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED'
  nationality: string
  phoneNumber: string
  // Step 3
  idType: 'NIN' | 'INTERNATIONAL_PASSPORT' | 'DRIVERS_LICENSE' | 'VOTERS_CARD' | 'RESIDENCE_PERMIT'
  idNumber: string
  // Step 4
  residencyStatus: 'CITIZEN' | 'RESIDENT' | 'NON_RESIDENT'
  passportNumber?: string
  countryOfCitizenship?: string
  // Step 5
  residentialAddress: string
  apartmentSuite?: string
  city: string
  state: string
  country: string
  postalCode?: string
  // Step 6
  profilePhoto?: File
  governmentIdFile?: File
  // Step 7
  termsAccepted: boolean
  declarationConfirmed: boolean
}