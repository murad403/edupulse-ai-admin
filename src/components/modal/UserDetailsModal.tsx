'use client'

import React from 'react'
import { X, Key, IdCard, School, Mail, Clock, Cpu, Award } from 'lucide-react'
import { UserProfile } from '@/components/app/user-management/UserCard'
import { Button } from '@/components/ui/button'

interface UserDetailsModalProps {
  user: UserProfile | null
  isOpen: boolean
  onClose: () => void
}

const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200">
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
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin">
          
          {/* Header Card Summary */}
          <div className="rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4 bg-gray-50/30">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-16 w-16 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col text-center sm:text-left flex-1">
              <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                <h3 className="text-lg font-bold text-title">{user.name}</h3>
                <span className={`text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                  user.status === 'ACTIVE' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {user.status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Key className="h-3.5 w-3.5 text-main" />
                  <span>{user.role}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <IdCard className="h-3.5 w-3.5 text-gray-400" />
                  <span>ID: {user.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* School */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <School className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">School Affiliation</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.school}</span>
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

            {/* Last Active */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Last Gateway Session</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.lastActive}</span>
              </div>
            </div>

            {/* AI Limit */}
            <div className="rounded-xl border border-gray-100 p-3.5 bg-white flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Cpu className="h-4.5 w-4.5 text-main" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">Cognitive Assist Limit</span>
                <span className="text-xs font-bold text-slate-800 mt-1 truncate">{user.limit}</span>
              </div>
            </div>

          </div>

          {/* Socratic Classrooms Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              ACTIVE SOCRATIC CLASSROOMS
            </h4>
            
            <div className="space-y-2.5">
              {user.classrooms && user.classrooms.length > 0 ? (
                user.classrooms.map((classroom, index) => (
                  <div 
                    key={index}
                    className="rounded-xl border border-gray-100 bg-white p-3.5 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800">{classroom.name}</span>
                      <span className="text-[10px] font-semibold text-gray-400 mt-0.5">{classroom.pupils} pupils</span>
                    </div>
                    
                    <span className="rounded-lg border border-orange-200 bg-orange-50/20 px-2.5 py-1 text-[9px] font-extrabold text-main uppercase tracking-wide">
                      {classroom.badge}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                  <span className="text-xs font-semibold text-gray-400">No active classrooms assigned.</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer Close Button */}
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

export default UserDetailsModal