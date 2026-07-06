'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  schoolName: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
  region: z.string().min(2, { message: 'Region / District Office is required.' }),
  teachersCount: z.coerce.number({ error: 'Please enter a number.' }).int().min(0, { message: 'Must be a positive integer.' }),
  studentsCount: z.coerce.number({ error: 'Please enter a number.' }).int().min(0, { message: 'Must be a positive integer.' }),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

type FormData = z.infer<typeof schema>

interface AddSchoolModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddSchoolModal = ({ isOpen, onClose }: AddSchoolModalProps) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      schoolName: '',
      region: '',
      teachersCount: undefined,
      studentsCount: undefined,
      status: 'ACTIVE'
    }
  })

  const currentStatus = watch('status')

  if (!isOpen) return null

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('School submitted: ', data)
    alert(`Success! Registered school: ${data.schoolName}`)
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
        <h2 className="text-lg font-bold text-title mb-6">Register New School Profile</h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* School Name */}
          <div className="flex flex-col">
            <Label htmlFor="schoolName">School Name</Label>
            <Input
              id="schoolName"
              placeholder="e.g. Crescent Valley Prep"
              {...register('schoolName')}
            />
            {errors.schoolName && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.schoolName.message}</span>
            )}
          </div>

          {/* Region / District Office */}
          <div className="flex flex-col">
            <Label htmlFor="region">Region / District Office</Label>
            <Input
              id="region"
              placeholder="e.g. Northeast Regional District"
              {...register('region')}
            />
            {errors.region && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.region.message}</span>
            )}
          </div>

          {/* Teachers & Students Counts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="teachersCount">Teachers Count</Label>
              <Input
                id="teachersCount"
                type="number"
                placeholder="15"
                {...register('teachersCount')}
              />
              {errors.teachersCount && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.teachersCount.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="studentsCount">Students Count</Label>
              <Input
                id="studentsCount"
                type="number"
                placeholder="250"
                {...register('studentsCount')}
              />
              {errors.studentsCount && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.studentsCount.message}</span>
              )}
            </div>
          </div>

          {/* Registration Status Selector */}
          <div className="flex flex-col">
            <Label>Registration Status</Label>
            <div className="flex items-center gap-6 mt-1">
              <button
                type="button"
                onClick={() => setValue('status', 'ACTIVE')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${currentStatus === 'ACTIVE'
                    ? 'border-main text-title font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setValue('status', 'INACTIVE')}
                className={`text-sm font-bold pb-1 border-b-2 transition-all cursor-pointer ${currentStatus === 'INACTIVE'
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
              {isSubmitting ? 'Registering...' : 'Register School'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddSchoolModal