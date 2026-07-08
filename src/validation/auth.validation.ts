import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export type SignInInput = z.infer<typeof signInSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters').regex(/^\d+$/, 'OTP must contain only numbers')
})

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().optional()
})

export type TProfileForm = z.infer<typeof profileSchema>

