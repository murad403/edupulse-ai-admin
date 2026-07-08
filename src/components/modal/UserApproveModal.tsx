'use client'

import React from 'react'
import { X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApprovedUserMutation } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'

interface UserApproveModalProps {
  teacherId: number | null
  isOpen: boolean
  onClose: () => void
}

const UserApproveModal = ({ teacherId, isOpen, onClose }: UserApproveModalProps) => {
  const [approveUser, { isLoading }] = useApprovedUserMutation()

  if (!isOpen || !teacherId) return null

  const handleApprove = async () => {
    const toastId = toast.loading('Approving teacher account...')
    try {
      await approveUser(teacherId).unwrap()
      toast.success('Teacher profile approved successfully.', { id: toastId })
      onClose()
    } catch (err: any) {
    //   console.error(err)
      const errMsg = err?.data?.message || 'Failed to approve teacher profile.'
      toast.error(errMsg, { id: toastId })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200">
      <div 
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Icon */}
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
        </div>

        {/* Text Details */}
        <h3 className="text-base font-bold text-title">Approve Teacher Account</h3>
        <p className="text-xs font-semibold text-gray-400 mt-2 leading-relaxed">
          Are you sure you want to approve this teacher account? Approving them will grant them complete access to EduPulse platform resources and features.
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-50">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="h-10 text-xs font-bold cursor-pointer rounded-xl"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleApprove}
            disabled={isLoading}
            className="h-10 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10 cursor-pointer rounded-xl"
          >
            {isLoading ? 'Approving...' : 'Approve Account'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default UserApproveModal