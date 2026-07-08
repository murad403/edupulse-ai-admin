'use client'

import React from 'react'
import { X, School, Mail, Calendar, Key, ShieldCheck, DoorOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useGetUserDetailsQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'
import { TeacherItem } from '@/redux/features/dashboard/dashboard.type'

interface UserDetailsModalProps {
  teacherId: number | null
  isOpen: boolean
  onClose: () => void
  onEditClick: (user: TeacherItem) => void
}

const UserDetailsModal = ({ teacherId, isOpen, onClose, onEditClick }: UserDetailsModalProps) => {
  const { data: userDetailsResponse, isLoading } = useGetUserDetailsQuery(
    teacherId!,
    { skip: !teacherId || !isOpen }
  )

  if (!isOpen || !teacherId) return null

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden"
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
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none mb-4 block">
            EDUPULSE • CORE PROFILE DETAILS
          </span>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto space-y-5 animate-pulse text-left">
            {/* Header Card Summary */}
            <div className="rounded-xl border border-gray-100 p-4 flex items-center gap-4 bg-gray-50/30">
              <Skeleton className="h-16 w-16 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
                  <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5 mt-0.5">
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer close button */}
          <div className="pt-4 border-t border-gray-50 mt-5">
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  const user = userDetailsResponse

  if (!user) return null

  const isStatusApproved = user.approval_status.toLowerCase() === 'approved'
  const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim()
  const displayAvatarUrl = user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=F97316&color=fff`

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none mb-4 block">
          EDUPULSE • CORE PROFILE DETAILS
        </span>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin text-left">
          
          {/* Header Card Summary */}
          <div className="rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4 bg-gray-50/30">
            <img 
              src={displayAvatarUrl} 
              alt={displayName} 
              className="h-16 w-16 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col text-center sm:text-left flex-1 min-w-0">
              <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                <h3 className="text-lg font-bold text-title">{displayName}</h3>
                <span className={cn(
                  "text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md",
                  isStatusApproved 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-amber-50 text-amber-600'
                )}>
                  {user.approval_status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Key className="h-3.5 w-3.5 text-main" />
                  <span>Grade {user.grade}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                  <span>Teacher ID: {user.teacher_id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* School */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <School className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">School Affiliation</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.school_name || 'N/A'}</span>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Mail className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Official Work Email</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.email}</span>
              </div>
            </div>

            {/* Room */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <DoorOpen className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Assigned Classroom Room</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.room || 'N/A'}</span>
              </div>
            </div>

            {/* Registration Date */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Calendar className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Registration Date</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-50 mt-5 flex gap-3">
          <Button 
            onClick={() => {
              onClose()
              onEditClick(user)
            }}
            className="flex-1 h-11 justify-center bg-orange-50 hover:bg-orange-100 text-main text-xs font-bold border border-orange-100 cursor-pointer rounded-xl"
          >
            Edit Profile Details
          </Button>
          <Button 
            onClick={onClose}
            className="flex-1 h-11 justify-center bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 cursor-pointer rounded-xl"
          >
            Acknowledge & Close
          </Button>
        </div>

      </div>
    </div>
  )
}

export default UserDetailsModal