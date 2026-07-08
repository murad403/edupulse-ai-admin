'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reportSchema, TReportForm } from '@/validation/all.validation'
import { useGenerateReportMutation } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'

interface GenerateReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const GenerateReportModal = ({ isOpen, onClose }: GenerateReportModalProps) => {
  const [generateReport] = useGenerateReportMutation()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm<TReportForm>({
    resolver: zodResolver(reportSchema) as any,
    defaultValues: {
      analyticalFocus: '',
      targetSchoolRange: 0,
      temporalBounds: 0
    }
  })

  if (!isOpen) return null

  const onSubmit = async (data: TReportForm) => {
    const toastId = toast.loading('Compiling report criteria...')
    try {
      const response = await generateReport({
        analyticalFocus: data.analyticalFocus,
        targetSchoolRange: Number(data.targetSchoolRange),
        temporalBounds: Number(data.temporalBounds)
      }).unwrap()
      toast.success(response.message || 'Report generated successfully!', { id: toastId })
      reset()
      onClose()
    } catch (err: any) {
      // console.error(err)
      const errMsg = err?.data?.message || 'Failed to generate report.'
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
        <h2 className="text-lg font-bold text-title mb-6">Generate Pulse AI Report</h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Analytical Focus */}
          <div className="flex flex-col">
            <Label htmlFor="analyticalFocus">Analytical Focus</Label>
            <Input
              id="analyticalFocus"
              placeholder="e.g. Platform Engagement, Cognitive engagement metrics"
              {...register('analyticalFocus')}
            />
            {errors.analyticalFocus && (
              <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.analyticalFocus.message}</span>
            )}
          </div>

          {/* School Range & Temporal Bounds Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="targetSchoolRange">Target School Range</Label>
              <Input
                id="targetSchoolRange"
                type="number"
                placeholder="e.g. 1"
                {...register('targetSchoolRange')}
              />
              {errors.targetSchoolRange && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.targetSchoolRange.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="temporalBounds">Temporal Bounds (Days)</Label>
              <Input
                id="temporalBounds"
                type="number"
                placeholder="e.g. 30"
                {...register('temporalBounds')}
              />
              {errors.temporalBounds && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.temporalBounds.message}</span>
              )}
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
              {isSubmitting ? 'Compiling...' : 'Compile Report'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default GenerateReportModal