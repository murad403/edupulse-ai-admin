'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid professional email.' }),
  schoolAffiliation: z.string().min(2, { message: 'School affiliation is required.' }),
  specialization: z.string().min(2, { message: 'Specialization / subject is required.' }),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

type FormData = z.infer<typeof schema>

interface AddTeacherModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddTeacherModal = ({ isOpen, onClose }: AddTeacherModalProps) => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      schoolAffiliation: '',
      specialization: '',
      status: 'ACTIVE'
    }
  })

  const currentStatus = watch('status')

  if (!isOpen) return null

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('Teacher submitted: ', data)
    alert(`Success! Created account for ${data.fullName}`)
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <h2 className="text-lg font-bold text-title mb-6">Add New Teacher Account</h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name */}
          <div className="flex flex-col">
            <Label htmlFor="fullName">Teacher Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="e.g. Sarah Jenkins"
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.fullName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label htmlFor="email">Professional Email</Label>
            <Input 
              id="email" 
              type="email"
              placeholder="sjenk@primaryeducation.edu"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.email.message}</span>
            )}
          </div>

          {/* School & Specialization Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="schoolAffiliation">School Affiliation</Label>
              <Input 
                id="schoolAffiliation" 
                placeholder="e.g. Oakwood High School"
                {...register('schoolAffiliation')}
              />
              {errors.schoolAffiliation && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.schoolAffiliation.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="specialization">Specialization / Subject</Label>
              <Input 
                id="specialization" 
                placeholder="Biology Teacher"
                {...register('specialization')}
              />
              {errors.specialization && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.specialization.message}</span>
              )}
            </div>
          </div>

          {/* Initial Status Selector */}
          <div className="flex flex-col">
            <Label>Initial Status</Label>
            <div className="flex items-center gap-6 mt-1">
              <button
                type="button"
                onClick={() => setValue('status', 'ACTIVE')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${
                  currentStatus === 'ACTIVE' 
                    ? 'border-main text-title font-extrabold' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setValue('status', 'INACTIVE')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${
                  currentStatus === 'INACTIVE' 
                    ? 'border-main text-title font-extrabold' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Actions Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="h-10 px-5 text-xs font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-10 px-5 text-xs font-bold bg-main hover:bg-main-dark cursor-pointer text-white shadow-md shadow-orange-500/10"
            >
              {isSubmitting ? 'Adding...' : 'Add Profile'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddTeacherModal