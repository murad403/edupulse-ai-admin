'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Camera, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/auth/auth.api'
import { profileSchema, TProfileForm } from '@/validation/auth.validation'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

const EditProfileTab = () => {
  const { data: profileResponse, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const [avatarUrl, setAvatarUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TProfileForm>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  })

  // Watch names to update dynamic avatar initials fallback
  const watchedFirstName = watch('firstName') || ''
  const watchedLastName = watch('lastName') || ''

  useEffect(() => {
    if (profileResponse?.data) {
      setValue('firstName', profileResponse.data.first_name || '')
      setValue('lastName', profileResponse.data.last_name || '')
      setValue('email', profileResponse.data.email || '')
      setAvatarUrl(profileResponse.data.profile_picture || '')
    }
  }, [profileResponse, setValue])

  if (isLoading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        {/* Header Summary */}
        <div className="flex items-start gap-3.5 border-b border-gray-50 pb-4">
          <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-3/4 max-w-sm" />
          </div>
        </div>
        
        {/* Profile Picture Upload Skeleton */}
        <div className="flex items-center gap-6 p-4 rounded-xl border border-gray-50 bg-slate-50/20">
          <Skeleton className="h-20 w-20 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </div>

        {/* Inputs Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        
        {/* Save Button Skeleton */}
        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (data: TProfileForm) => {
    const toastId = toast.loading('Saving profile changes...')
    try {
      const formData = new FormData()
      formData.append('first_name', data.firstName)
      formData.append('last_name', data.lastName)
      
      // Retain existing grade/room if available in the profile response data
      if (profileResponse?.data?.grade) {
        formData.append('grade', profileResponse.data.grade)
      }
      if (profileResponse?.data?.room) {
        formData.append('room', profileResponse.data.room)
      }

      if (selectedFile) {
        formData.append('profile_picture', selectedFile)
      }

      await updateProfile(formData).unwrap()
      toast.success('Admin profile updated successfully!', { id: toastId })
      setSelectedFile(null)
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Failed to save profile changes.'
      toast.error(errMsg, { id: toastId })
    }
  }

  const displayAvatarUrl = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(watchedFirstName + ' ' + watchedLastName)}&background=F97316&color=fff`

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Info */}
      <div className="flex items-start gap-3.5 border-b border-gray-50 pb-4">
        <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
          <User className="h-4.5 w-4.5 text-main" />
        </div>
        <div>
          <h3 className="text-base font-bold text-title">Edit Admin Profile</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">
            Modify your administrative visual representation and credential details across the system.
          </p>
        </div>
      </div>

      {/* Profile Photo Upload Section */}
      <div className="flex items-center gap-6 p-4 rounded-xl border border-gray-50 bg-slate-50/20">
        <div className="relative group">
          <img 
            src={displayAvatarUrl} 
            alt="Profile Avatar"
            className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-gray-100"
          />
          <button 
            type="button"
            onClick={triggerFileInput}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Camera className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-title">Profile Picture</span>
          <p className="text-[10px] font-semibold text-gray-400">
            JPG, GIF or PNG. Max size of 800K
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileInput}
              className="h-8 px-3 text-[10px] font-bold border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="h-3 w-3" />
              Upload Image
            </Button>
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-xs font-bold text-title">First Name</Label>
            <Input 
              id="firstName"
              className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
              {...register('firstName')}
            />
            {errors.firstName && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.firstName.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-xs font-bold text-title">Last Name</Label>
            <Input 
              id="lastName"
              className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
              {...register('lastName')}
            />
            {errors.lastName && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.lastName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email" className="text-xs font-bold text-title">Email Address</Label>
            <Input 
              id="email"
              type="email"
              disabled
              className="text-xs text-gray-400 bg-gray-100 font-semibold cursor-not-allowed border-gray-200"
              {...register('email')}
            />
          </div>

        </div>

        {/* Save Button Row */}
        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
          <Button 
            type="submit"
            disabled={isUpdating}
            className="bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 rounded-xl px-5 h-10 cursor-pointer"
          >
            {isUpdating ? 'Saving...' : 'Save Profile Changes'}
          </Button>
        </div>
      </form>

    </div>
  )
}

export default EditProfileTab