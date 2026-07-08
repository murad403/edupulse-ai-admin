'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddSchoolMutation } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'
import { schoolSchema, TSchoolForm } from '@/validation/all.validation'



interface AddSchoolModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddSchoolModal = ({ isOpen, onClose }: AddSchoolModalProps) => {
  const [addSchool] = useAddSchoolMutation()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TSchoolForm>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolName: '',
      region: ''
    }
  })

  if (!isOpen) return null

  const onSubmit = async (data: TSchoolForm) => {
    const toastId = toast.loading('Registering school profile...')
    try {
      await addSchool({
        school_name: data.schoolName,
        region_district_office: data.region,
        registration_status: 'Active'
      }).unwrap()
      toast.success('School profile registered successfully!', { id: toastId })
      reset()
      onClose()
    } catch (err: any) {
      // console.error(err)
      const errMsg = err?.data?.message || 'Failed to register school profile.'
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

          {/* Registration Status */}
          <div className="flex flex-col">
            <Label>Registration Status</Label>
            <div className="mt-1.5">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-[9px] font-extrabold tracking-wide uppercase text-emerald-600">
                Active
              </span>
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