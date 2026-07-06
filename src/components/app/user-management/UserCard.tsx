'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Classroom {
  name: string
  pupils: number
  badge: string
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  role: string
  school: string
  email: string
  lastActive: string
  limit: string
  status: 'ACTIVE' | 'INACTIVE'
  classrooms: Classroom[]
}

interface UserCardProps {
  user: UserProfile
  onSelect: (user: UserProfile) => void
  onDelete: (id: string) => void
  onChangeStatus: (id: string) => void
}

const UserCard = ({ user, onSelect, onDelete, onChangeStatus }: UserCardProps) => {
  return (
    <div 
      onClick={() => onSelect(user)}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between min-h-[230px] h-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="h-10 w-10 rounded-full object-cover border border-gray-100"
        />
        <div className="flex flex-col text-left">
          <h4 className="text-sm font-bold text-title leading-tight">{user.name}</h4>
          <span className="text-[11px] text-gray-400 font-semibold mt-0.5">{user.role}</span>
        </div>
        <span className={cn(
          "ml-auto text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md",
          user.status === 'ACTIVE' 
            ? "bg-emerald-50 text-emerald-600" 
            : "bg-gray-100 text-gray-400"
        )}>
          {user.status}
        </span>
      </div>

      {/* Middle Detail Key-Values */}
      <div className="space-y-1.5 my-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">School Affiliation</span>
          <span className="text-slate-700 font-bold text-right truncate max-w-[160px]">
            {user.school}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">Professional Email</span>
          <span className="text-slate-700 font-bold text-right truncate max-w-[160px]">
            {user.email}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400 font-medium text-left">Last Interactive Connection</span>
          <span className="text-slate-700 font-bold text-right">
            {user.lastActive}
          </span>
        </div>
      </div>

      {/* Bottom Footer Action Controls */}
      <div className="border-t border-gray-50 pt-2.5 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onChangeStatus(user.id)
          }}
          className="text-[11px] font-bold text-gray-400 hover:text-main transition-colors cursor-pointer"
        >
          Change status
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(user.id)
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-lg transition-colors cursor-pointer"
          title="Delete profile"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default UserCard