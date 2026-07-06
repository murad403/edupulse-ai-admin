'use client'

import React from 'react'
import { School } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SchoolProfile {
  id: string
  name: string
  region: string
  status: 'ACTIVE' | 'INACTIVE'
  staffLeads: number
  enrolledStudents: number
  apiRequests: string
  leadCoordinator: string
  registrationDate: string
  gatewayServer: string
  alignmentStatus: 'COMPLIANT' | 'NON-COMPLIANT'
}

interface SchoolAndClassCardProps {
  school: SchoolProfile
  onSelect: (school: SchoolProfile) => void
}

const SchoolAndClassCard = ({ school, onSelect }: SchoolAndClassCardProps) => {
  return (
    <div 
      onClick={() => onSelect(school)}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header Section */}
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
          <School className="h-4.5 w-4.5 text-main" />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <h4 className="text-sm font-bold text-title truncate leading-snug">{school.name}</h4>
          <span className="text-[11px] text-gray-400 font-semibold mt-0.5">{school.region}</span>
        </div>
        <span className={cn(
          "ml-auto text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md shrink-0",
          school.status === 'ACTIVE' 
            ? "bg-emerald-50 text-emerald-600" 
            : "bg-gray-100 text-gray-400"
        )}>
          {school.status}
        </span>
      </div>

      {/* Middle Stats Row */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        
        {/* Staff Leads */}
        <div className="flex flex-col items-center justify-center bg-slate-50/65 py-2.5 px-1.5 rounded-lg border border-slate-100/50">
          <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 text-center">Staff Leads</span>
          <span className="text-sm font-extrabold text-slate-800 leading-none">{school.staffLeads}</span>
        </div>

        {/* Enrolled Students */}
        <div className="flex flex-col items-center justify-center bg-slate-50/65 py-2.5 px-1.5 rounded-lg border border-slate-100/50">
          <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 text-center">Enrolled Students</span>
          <span className="text-sm font-extrabold text-slate-800 leading-none">{school.enrolledStudents}</span>
        </div>

        {/* API Requests */}
        <div className="flex flex-col items-center justify-center bg-slate-50/65 py-2.5 px-1.5 rounded-lg border border-slate-100/50">
          <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 text-center">API Requests</span>
          <span className={cn(
            "text-sm font-extrabold leading-none",
            school.status === 'ACTIVE' ? "text-emerald-600" : "text-slate-800"
          )}>
            {school.apiRequests}
          </span>
        </div>

      </div>

    </div>
  )
}

export default SchoolAndClassCard