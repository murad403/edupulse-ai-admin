'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddTeacherMutation, useGetSchoolsQuery } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'
import { teacherSchema, TTeacherForm } from '@/validation/all.validation'


interface AddTeacherModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddTeacherModal = ({ isOpen, onClose }: AddTeacherModalProps) => {
  const [addTeacher] = useAddTeacherMutation()
  const { data: schoolsData, isLoading: isLoadingSchools } = useGetSchoolsQuery()

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<TTeacherForm>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      schoolId: '',
      grade: '',
      status: 'approved'
    }
  })

  // Manually register status since it does not have a native input ref
  React.useEffect(() => {
    register('status')
  }, [register])

  const currentStatus = watch('status')

  if (!isOpen) return null

  const onSubmit = async (data: TTeacherForm) => {
    const toastId = toast.loading('Adding new teacher account...')
    try {
      await addTeacher({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        school_id: Number(data.schoolId),
        grade: data.grade,
        approval_status: data.status
      }).unwrap()
      toast.success('Teacher account created successfully!', { id: toastId })
      reset()
      onClose()
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Failed to create teacher account.'
      toast.error(errMsg, { id: toastId })
    }
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

          {/* First and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="e.g. Sarah"
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
                placeholder="e.g. Jenkins"
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.lastName.message}</span>
              )}
            </div>
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

          {/* Password */}
          <div className="flex flex-col">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.password.message}</span>
            )}
          </div>

          {/* School Affiliation Dropdown */}
          <div className="flex flex-col">
            <Label htmlFor="schoolId">School Affiliation</Label>
            <select
              id="schoolId"
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-title placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-main/25 focus:border-main disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150"
              disabled={isLoadingSchools}
              {...register('schoolId')}
            >
              <option value="">
                {isLoadingSchools ? 'Loading schools list...' : 'Select a school...'}
              </option>
              {schoolsData?.data?.results?.map((school) => (
                <option key={school.school_id} value={school.school_id}>
                  {school.school_name}
                </option>
              ))}
            </select>
            {errors.schoolId && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.schoolId.message}</span>
            )}
          </div>

          {/* Grade */}
          <div className="flex flex-col">
            <Label htmlFor="grade">Grade</Label>
            <Input
              id="grade"
              placeholder="e.g. 5th Grade"
              {...register('grade')}
            />
            {errors.grade && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.grade.message}</span>
            )}
          </div>

          {/* Initial Status Selector */}
          <div className="flex flex-col">
            <Label>Initial Status</Label>
            <div className="flex items-center gap-6 mt-1">
              <button
                type="button"
                onClick={() => setValue('status', 'approved')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${currentStatus === 'approved'
                    ? 'border-main text-title font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => setValue('status', 'pending')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${currentStatus === 'pending'
                    ? 'border-main text-title font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
              >
                Pending
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