'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Camera, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateUserDetailsMutation } from '@/redux/features/dashboard/dashboard.api'
import { editUserSchema, TEditUserForm } from '@/validation/all.validation'
import { TeacherItem } from '@/redux/features/dashboard/dashboard.type'
import { toast } from 'sonner'

interface UserEditModalProps {
  user: TeacherItem | null
  isOpen: boolean
  onClose: () => void
}

const UserEditModal = ({ user, isOpen, onClose }: UserEditModalProps) => {
  const [updateUserDetails, { isLoading: isUpdating }] = useUpdateUserDetailsMutation()

  const [avatarPreview, setAvatarPreview] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TEditUserForm>({
    resolver: zodResolver(editUserSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      schoolName: '',
      grade: '',
      room: ''
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        schoolName: user.school_name || '',
        grade: user.grade || '',
        room: user.room || ''
      })
      setAvatarPreview(user.profile_picture || '')
      setSelectedFile(null)
    }
  }, [user, reset])

  if (!isOpen || !user) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (data: TEditUserForm) => {
    const toastId = toast.loading('Updating user profile...')
    try {
      const formData = new FormData()
      formData.append('first_name', data.firstName)
      formData.append('last_name', data.lastName)
      formData.append('email', user.email) // email cannot be edited, but sent in payload
      formData.append('school_name', user.school_name || '') // preserve existing school_name
      formData.append('grade', data.grade)
      formData.append('room', data.room || '')

      if (selectedFile) {
        formData.append('profile_picture', selectedFile)
      }

      await updateUserDetails({
        teacher_id: user.teacher_id,
        data: formData
      }).unwrap()

      toast.success('User profile updated successfully.', { id: toastId })
      onClose()
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Failed to update user profile.'
      toast.error(errMsg, { id: toastId })
    }
  }

  const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim()
  const displayAvatarUrl = avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=F97316&color=fff`

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold text-title mb-6">Edit Teacher Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          
          {/* Avatar Upload Section */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-50 bg-slate-50/20">
            <div className="relative group shrink-0">
              <img 
                src={displayAvatarUrl} 
                alt="Avatar preview"
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-gray-100"
              />
              <button 
                type="button"
                onClick={triggerFileInput}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <Camera className="h-4.5 w-4.5 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-xs font-bold text-title">Profile Avatar</span>
              <div className="flex items-center gap-2">
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={triggerFileInput}
                  className="h-7.5 px-3 text-[10px] font-bold border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="h-3 w-3" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>

          {/* First & Last Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                placeholder="e.g. Robert"
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.firstName.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                placeholder="e.g. Smith"
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          {/* Email (Disabled) */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              disabled
              className="text-xs text-gray-400 bg-gray-100 font-semibold cursor-not-allowed border-gray-200"
              {...register('email')}
            />
          </div>

          {/* Grade & Room Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="grade">Grade Level</Label>
              <Input 
                id="grade"
                placeholder="e.g. 8th Grade"
                {...register('grade')}
              />
              {errors.grade && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.grade.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="room">Room Number</Label>
              <Input 
                id="room"
                placeholder="e.g. 12"
                {...register('room')}
              />
              {errors.room && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.room.message}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="h-10 px-5 text-xs font-bold cursor-pointer rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="h-10 px-5 text-xs font-bold bg-main hover:bg-main-dark cursor-pointer text-white shadow-md shadow-orange-500/10 rounded-xl"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default UserEditModal