'use client'

import React from 'react'
import { Trash2, Eye, Edit, UserCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TeacherItem } from '@/redux/features/dashboard/dashboard.type'

interface UserCardProps {
  user: TeacherItem
  onSelect: (user: TeacherItem) => void
  onDelete: (id: number) => void
  onApprove: (id: number) => void
  onEdit: (user: TeacherItem) => void
}

const UserCard = ({ user, onSelect, onDelete, onApprove, onEdit }: UserCardProps) => {
  const isStatusApproved = user.approval_status.toLowerCase() === 'approved'
  const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'No Name'
  
  const displayAvatarUrl = user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=F97316&color=fff`

  return (
    <div
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between min-h-[230px] h-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <img
          src={displayAvatarUrl}
          alt={displayName}
          className="h-10 w-10 rounded-full object-cover border border-gray-100"
        />
        <div className="flex flex-col text-left font-semibold">
          <h4 className="text-sm font-bold text-title leading-tight">{displayName}</h4>
          <span className="text-[11px] text-gray-400 font-semibold mt-0.5">Grade {user.grade}</span>
        </div>
        <span className={cn(
          "ml-auto text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md",
          isStatusApproved
            ? "bg-emerald-50 text-emerald-600"
            : "bg-amber-50 text-amber-600"
        )}>
          {user.approval_status}
        </span>
      </div>

      {/* Middle Detail Key-Values */}
      <div className="space-y-1.5 my-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">School Affiliation</span>
          <span className="text-slate-700 font-bold text-right truncate max-w-[160px]">
            {user.school_name || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">Professional Email</span>
          <span className="text-slate-700 font-bold text-right truncate max-w-[160px]">
            {user.email}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">Room Number</span>
          <span className="text-slate-700 font-bold text-right">
            {user.room || 'N/A'}
          </span>
        </div>
      </div>

      {/* Bottom Footer Action Controls */}
      <div className="border-t border-gray-50 pt-2.5 flex items-center justify-between">
        {/* Left side spacing - empty since change status is removed */}
        <div />

        {/* Action Icons group */}
        <div className="flex items-center gap-1">
          {/* Approve button - only show if status is pending */}
          {!isStatusApproved && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onApprove(user.teacher_id)
              }}
              className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 p-1.5 rounded-lg transition-colors cursor-pointer"
              title="Approve teacher"
            >
              <UserCheck className="h-4 w-4" />
            </button>
          )}

          {/* View details */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(user)
            }}
            className="text-gray-400 hover:text-main hover:bg-orange-50/50 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Edit profile */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(user)
            }}
            className="text-gray-400 hover:text-main hover:bg-orange-50/50 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Edit profile"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Delete profile */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(user.teacher_id)
            }}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Delete profile"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard