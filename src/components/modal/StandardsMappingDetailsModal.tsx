'use client'

import React from 'react'
import { X, FileText, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface StandardItem {
  code: string
  subject: string
  grade: string
  details: string
  activePlans: number
  status: 'FULLY MAPPED' | 'PARTIALLY MAPPED' | 'UNMAPPED'
  authorityAgency: string
}

interface StandardsMappingDetailsModalProps {
  standard: StandardItem | null
  isOpen: boolean
  onClose: () => void
}

const StandardsMappingDetailsModal = ({ standard, isOpen, onClose }: StandardsMappingDetailsModalProps) => {
  if (!isOpen || !standard) return null

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
          <div className="rounded-xl border border-gray-100 p-4 flex flex-col gap-3 bg-gray-50/30">
            <div className="flex items-center justify-between">
              <span className="bg-orange-50 text-main px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase">
                {standard.code}
              </span>
              <span className={cn(
                "text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md",
                standard.status === 'FULLY MAPPED' && 'bg-emerald-50 text-emerald-600',
                standard.status === 'PARTIALLY MAPPED' && 'bg-orange-50 text-orange-600',
                standard.status === 'UNMAPPED' && 'bg-gray-100 text-gray-400'
              )}>
                {standard.status}
              </span>
            </div>
            
            <div className="flex flex-col text-left min-w-0">
              <h3 className="text-lg font-bold text-title">{standard.subject}</h3>
              <span className="text-xs font-semibold text-gray-400 mt-1">{standard.grade} Alignment Frame</span>
            </div>
          </div>

          {/* Specification Details Section */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              OFFICIAL SPECIFICATION DETAILS
            </h4>
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-xs font-bold text-slate-700 leading-relaxed text-left shadow-xs">
              "{standard.details}"
            </div>
          </div>

          {/* 2-Column Info highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Lessons Configured */}
            <div className="rounded-xl border border-gray-100 p-4 bg-white flex items-start gap-3.5 shadow-xs">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <FileText className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Lessons Configured</span>
                <span className="font-mono text-base font-extrabold text-slate-800 mt-1.5 leading-none">
                  {standard.activePlans} active
                </span>
                <span className="text-[10px] font-semibold text-gray-400 mt-0.5 leading-none">syllabuses</span>
              </div>
            </div>

            {/* Authority Agency */}
            <div className="rounded-xl border border-gray-100 p-4 bg-white flex items-start gap-3.5 shadow-xs">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Globe className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Authority Agency</span>
                <span className="text-xs font-bold text-main mt-2.5 truncate leading-tight">
                  {standard.authorityAgency}
                </span>
              </div>
            </div>

          </div>

          {/* Socratic Prompt Guidelines Box */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              SOCRATIC PROMPT GUIDELINES
            </h4>
            
            {/* Console Logger Container */}
            <div className="rounded-xl bg-slate-950 p-4 font-mono text-[11.5px] leading-relaxed text-left border border-slate-900 shadow-inner overflow-x-auto select-text scrollbar-thin">
              <div className="text-slate-500 font-medium">
                # System prompt directive triggered for {standard.code}
              </div>
              <div className="text-emerald-500 font-extrabold mt-1">
                [STRICT_SOCRATIC_MAPPING_ON]
              </div>
              <div className="mt-1 text-slate-300">
                <span className="text-sky-400 font-bold">[GUIDANCE]</span>: <span className="text-amber-300">"Do not output direct answers. Formulate an outline assessing students' understanding or capability to: "{standard.details}""</span>
              </div>
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

export default StandardsMappingDetailsModal