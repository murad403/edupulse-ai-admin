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
  analyticalFocus: z.string().min(2, { message: 'Analytical Focus is required.' }),
  targetSchoolRange: z.string().min(2, { message: 'Target School Range is required.' }),
  temporalBounds: z.string().min(2, { message: 'Temporal Bounds are required.' })
})

type FormData = z.infer<typeof schema>

interface GenerateReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const GenerateReportModal = ({ isOpen, onClose }: GenerateReportModalProps) => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      analyticalFocus: '',
      targetSchoolRange: '',
      temporalBounds: ''
    }
  })

  if (!isOpen) return null

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('Report criteria: ', data)
    alert(`Generating Report! Focus: ${data.analyticalFocus}`)
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
        <h2 className="text-lg font-bold text-title mb-6">Generate Pulse AI Report</h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Analytical Focus */}
          <div className="flex flex-col">
            <Label htmlFor="analyticalFocus">Analytical Focus</Label>
            <Input 
              id="analyticalFocus" 
              placeholder="e.g. Cognitive engagement metrics, prompt efficiency"
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
                placeholder="e.g. All District Affiliates, High Schools"
                {...register('targetSchoolRange')}
              />
              {errors.targetSchoolRange && (
                <span className="text-[11px] text-red-500 mt-1 font-bold">{errors.targetSchoolRange.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="temporalBounds">Temporal Bounds</Label>
              <Input 
                id="temporalBounds" 
                placeholder="e.g. Last 30 Days, Q3 Term"
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