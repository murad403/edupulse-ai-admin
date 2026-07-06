'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Teacher {
  name: string
  avatar: string
  school: string
  lastActive: string
  status: 'ACTIVE' | 'INACTIVE'
}

const teachers: Teacher[] = [
  {
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    school: 'Oakwood High School',
    lastActive: '2 mins ago',
    status: 'ACTIVE'
  },
  {
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    school: 'Lincoln Magnet Academy',
    lastActive: '1 hour ago',
    status: 'ACTIVE'
  },
  {
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    school: 'Riverdale STEM Charter',
    lastActive: '3 hours ago',
    status: 'INACTIVE'
  },
  {
    name: 'David Kojo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    school: 'Metropolitan Tech High',
    lastActive: '1 day ago',
    status: 'ACTIVE'
  },
  {
    name: 'Amina Al-Jamil',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    school: 'Heights Elementary',
    lastActive: '2 days ago',
    status: 'INACTIVE'
  }
]

const RecentTeacherActivity = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
      <h3 className="text-base font-bold text-title mb-4">Recent Teacher Activity</h3>
      
      {/* Table Area */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[500px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              <th className="pb-3 font-extrabold">Name</th>
              <th className="pb-3 font-extrabold">School</th>
              <th className="pb-3 font-extrabold">Last Active</th>
              <th className="pb-3 font-extrabold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {teachers.map((teacher, index) => (
              <tr key={index} className="text-xs text-slate-700 hover:bg-gray-50/50 transition-colors">
                <td className="py-2.5 flex items-center gap-2.5 font-bold text-title">
                  <img 
                    src={teacher.avatar} 
                    alt={teacher.name} 
                    className="h-6 w-6 rounded-full object-cover border border-gray-100"
                  />
                  <span>{teacher.name}</span>
                </td>
                <td className="py-2.5 text-gray-500 font-semibold">{teacher.school}</td>
                <td className="py-2.5 text-gray-400 font-medium">{teacher.lastActive}</td>
                <td className="py-2.5 text-right">
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wide uppercase",
                    teacher.status === 'ACTIVE' 
                      ? "bg-emerald-50 text-emerald-600" 
                      : "bg-gray-100 text-gray-400"
                  )}>
                    {teacher.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Button */}
      <button className="w-full rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 transition-colors cursor-pointer text-center mt-4">
        Manage Teachers directory
      </button>
    </div>
  )
}

export default RecentTeacherActivity