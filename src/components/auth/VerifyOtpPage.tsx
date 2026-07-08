'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { verifyOtpSchema, VerifyOtpInput } from '@/validation/auth.validation'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useVerifyOtpMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

const VerifyOtpPage = () => {
  const router = useRouter()
  const [verifyOtp] = useVerifyOtpMutation()
  const [otpValues, setOtpValues] = React.useState<string[]>(['', '', '', '', '', ''])
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: ''
    }
  })

  // Register hidden form field
  React.useEffect(() => {
    register('otp')
  }, [register])

  const onSubmit = async (data: VerifyOtpInput) => {
    const email = sessionStorage.getItem('reset_email')
    if (!email) {
      toast.error('Session expired. Please request OTP again.')
      router.push('/auth/forgot-password')
      return
    }

    const toastId = toast.loading('Verifying code...')
    try {
      const response = await verifyOtp({
        email: email,
        otp_code: data.otp
      }).unwrap()
      toast.success(response.message || 'OTP verified. Proceed to reset password.', { id: toastId })
      sessionStorage.setItem('reset_token', response.data.reset_token.toString())
      router.push('/auth/reset-password')
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Invalid verification code.'
      toast.error(errMsg, { id: toastId })
    }
  }

  const handleChange = (index: number, val: string) => {
    if (val !== '' && !/^\d+$/.test(val)) return

    const newValues = [...otpValues]
    newValues[index] = val.slice(-1)
    setOtpValues(newValues)

    const fullCode = newValues.join('')
    setValue('otp', fullCode, { shouldValidate: true })

    if (val !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newValues = [...otpValues]
      if (newValues[index] === '') {
        if (index > 0) {
          newValues[index - 1] = ''
          setOtpValues(newValues)
          setValue('otp', newValues.join(''), { shouldValidate: true })
          inputRefs.current[index - 1]?.focus()
        }
      } else {
        newValues[index] = ''
        setOtpValues(newValues)
        setValue('otp', newValues.join(''), { shouldValidate: true })
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (!/^\d{6}$/.test(pastedData)) return

    const digits = pastedData.split('')
    setOtpValues(digits)
    setValue('otp', pastedData, { shouldValidate: true })
    inputRefs.current[5]?.focus()
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-gray-100 bg-white p-8 shadow-xl text-center animate-in fade-in duration-300">
      
      {/* Subtitles */}
      <h2 className="text-xl font-extrabold text-title">Verify Secure Token</h2>
      <p className="text-sm font-semibold text-gray-400 mt-1 mb-8">
        We have dispatched a 6-digit verification code. Please input it below.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
        
        {/* Hidden inputs to capture react-hook-form value */}
        <input type="hidden" {...register('otp')} />

        {/* OTP Input Grid */}
        <div className="space-y-2">
          <Label className="text-sm font-extrabold text-title block text-center mb-1">
            Verification Code (OTP)
          </Label>
          
          <div className="flex justify-center gap-2.5">
            {otpValues.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => { inputRefs.current[index] = el }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg font-bold border border-gray-200 bg-gray-50/20 rounded-xl focus:border-main focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 transition-all duration-200"
              />
            ))}
          </div>

          {errors.otp && (
            <span className="text-[10px] font-bold text-red-500 block text-center mt-2 leading-none">
              {errors.otp.message}
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
            {isSubmitting ? 'Verifying code...' : 'Confirm Verification Code'}
          </Button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link 
            href="/auth/forgot-password"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Request code again</span>
          </Link>
        </div>

      </form>

    </div>
  )
}

export default VerifyOtpPage