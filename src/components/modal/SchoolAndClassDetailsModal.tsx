'use client'

import React from 'react'
import { X, School, MapPin, ShieldCheck, Activity } from 'lucide-react'
import { SchoolProfile } from '@/components/app/schools-&-classes/SchoolAndClassCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SchoolAndClassDetailsModalProps {
  school: SchoolProfile | null
  isOpen: boolean
  onClose: () => void
}

const SchoolAndClassDetailsModal = ({ school, isOpen, onClose }: SchoolAndClassDetailsModalProps) => {
  if (!isOpen || !school) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200">
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

        {/* Modal Header Title */}
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none mb-4 block">
          EDUPULSE • CORE PROFILE DETAILS
        </span>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin">
          
          {/* Header Summary Card */}
          <div className="rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4 bg-gray-50/30">
            <div className="h-14 w-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 shadow-inner">
              <School className="h-7 w-7 text-main" />
            </div>
            
            <div className="flex flex-col text-center sm:text-left flex-1 min-w-0">
              <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                <h3 className="text-lg font-bold text-title truncate">{school.name}</h3>
                <span className={cn(
                  "text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md shrink-0",
                  school.status === 'ACTIVE' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-gray-100 text-gray-400'
                )}>
                  {school.status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <MapPin className="h-3.5 w-3.5 text-main shrink-0" />
                  <span className="truncate">{school.region}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span>NCES Reg: {school.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three-Column Highlights */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* Staff Leads */}
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none mb-2">Staff Leads</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-800 leading-none">{school.staffLeads}</span>
            </div>

            {/* Students */}
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none mb-2">Students</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-800 leading-none">{school.enrolledStudents}</span>
            </div>

            {/* API Prompts */}
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none mb-2">API Prompts</span>
              <span className="text-base sm:text-lg font-extrabold text-main leading-none">{school.apiRequests}</span>
            </div>

          </div>

          {/* Administrative Details List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              ADMINISTRATIVE DETAILS
            </h4>
            
            <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Lead Coordinator</span>
                <span className="text-slate-800 font-bold">{school.leadCoordinator}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Registration Date</span>
                <span className="text-slate-800 font-bold">{school.registrationDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Assigned Gateway Server</span>
                <span className="text-slate-800 font-bold truncate max-w-[200px]">{school.gatewayServer}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-0.5">
                <span className="text-gray-400 font-medium">Curriculum Alignment Status</span>
                <span className={cn(
                  "rounded-md px-2 py-0.5 text-[9px] font-extrabold tracking-wide uppercase",
                  school.alignmentStatus === 'COMPLIANT' 
                    ? "bg-emerald-50 text-emerald-600" 
                    : "bg-red-50 text-red-600"
                )}>
                  {school.alignmentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Operational Telemetry Box */}
          <div className="rounded-xl border border-orange-100 bg-orange-50/15 p-4 flex gap-3.5 items-start shadow-xs">
            <div className="mt-0.5 shrink-0">
              <Activity className="h-5 w-5 text-main" />
            </div>
            <div className="text-xs font-semibold text-slate-600 leading-relaxed text-left">
              This school profile syncs curriculum standards every 24 hours. The classroom cognitive model is locked to the global <span className="text-main font-extrabold">gemini-2.5-flash</span> gateway node.
            </div>
          </div>

        </div>

        {/* Footer close button */}
        <div className="pt-4 border-t border-gray-50 mt-5">
          <Button 
            onClick={onClose}
            className="w-full h-11 justify-center bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 cursor-pointer rounded-xl"
          >
            Acknowledge & Close
          </Button>
        </div>

      </div>
    </div>
  )
}

export default SchoolAndClassDetailsModal