'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { resetPasswordSchema, ResetPasswordInput } from '@/validation/auth.validation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

const ResetPasswordPage = () => {
  const router = useRouter()
  const [resetPassword] = useResetPasswordMutation()
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    const tokenStr = sessionStorage.getItem('reset_token')
    if (!tokenStr) {
      toast.error('Session expired. Please verify OTP again.')
      router.push('/auth/forgot-password')
      return
    }

    const resetToken = Number(tokenStr)
    const toastId = toast.loading('Saving new password...')
    try {
      const response = await resetPassword({
        reset_token: resetToken,
        new_password: data.password,
        confirm_password: data.confirmPassword
      }).unwrap()
      toast.success(response.message || 'Password reset successfully. Please log in.', { id: toastId })
      
      // Clear sessions
      sessionStorage.removeItem('reset_email')
      sessionStorage.removeItem('reset_token')

      router.push('/auth/sign-in')
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Failed to reset password.'
      toast.error(errMsg, { id: toastId })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center animate-in fade-in duration-300">

      {/* Subtitles */}
      <h2 className="text-xl font-extrabold text-title">Establish New Password</h2>
      <p className="text-sm font-semibold text-gray-400 mt-1 mb-8">
        Your verification token has succeeded. Please define your new credentials.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        
        {/* New Password */}
        <div className="space-y-1.5">
          <Label className="text-sm font-extrabold text-title">New Secret Password</Label>
          <div className="relative w-full">
            <Lock className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              {...register('password')}
              className="pl-9.5 pr-10 text-sm text-slate-700 font-semibold bg-gray-50/20 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <span className="text-[10px] font-bold text-red-500 leading-none">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label className="text-sm font-extrabold text-title">Confirm New Password</Label>
          <div className="relative w-full">
            <Lock className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input 
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repeat clean credentials"
              {...register('confirmPassword')}
              className="pl-9.5 pr-10 text-sm text-slate-700 font-semibold bg-gray-50/20 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-[10px] font-bold text-red-500 leading-none">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 justify-center bg-main hover:bg-main-dark text-white text-sm font-bold shadow-md shadow-orange-500/10 rounded-xl cursor-pointer"
          >
            {isSubmitting ? 'Rotating Credentials...' : 'Save New Password'}
          </Button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link 
            href="/auth/sign-in"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Cancel and back to sign in</span>
          </Link>
        </div>

      </form>

    </div>
  )
}

export default ResetPasswordPage