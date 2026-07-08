'use client'

import React from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteUserMutation } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'

interface UserDeleteModalProps {
  teacherId: number | null
  isOpen: boolean
  onClose: () => void
}

const UserDeleteModal = ({ teacherId, isOpen, onClose }: UserDeleteModalProps) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  if (!isOpen || !teacherId) return null

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting teacher account...')
    try {
      await deleteUser(teacherId).unwrap()
      toast.success('Teacher profile deleted successfully.', { id: toastId })
      onClose()
    } catch (err: any) {
      console.error(err)
      const errMsg = err?.data?.message || 'Failed to delete teacher profile.'
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

        {/* Warn Icon */}
        <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>

        {/* Text Details */}
        <h3 className="text-base font-bold text-title">Delete Teacher Profile</h3>
        <p className="text-xs font-semibold text-gray-400 mt-2 leading-relaxed">
          Are you sure you want to permanently delete this teacher account? This action is irreversible and will remove all their credentials and platform permissions.
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
            onClick={handleDelete}
            disabled={isLoading}
            className="h-10 text-xs font-bold bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/10 cursor-pointer rounded-xl"
          >
            {isLoading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default UserDeleteModal