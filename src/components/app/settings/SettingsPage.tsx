'use client'

import React, { useState } from 'react'
import { User, Lock, ChevronRight } from 'lucide-react'
import EditProfileTab from './EditProfileTab'
import PasswordChangeTab from './PasswordChangeTab'
import { cn } from '@/lib/utils'

type TabType = 'PROFILE' | 'PASSWORD'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('PROFILE')

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full items-start animate-in fade-in duration-300">
      
      {/* Left Settings Navigation Menu */}
      <div className="w-full md:w-[240px] shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm text-left">
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block leading-none mb-3 px-1">
          SETTINGS MENU
        </span>
        
        <div className="space-y-1">
          {/* Edit Profile */}
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={cn(
              "group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition-all relative overflow-hidden cursor-pointer",
              activeTab === 'PROFILE'
                ? "text-main bg-orange-50/50"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {activeTab === 'PROFILE' && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-main rounded-r-md" />
            )}
            <div className="flex items-center gap-2.5">
              <User className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                activeTab === 'PROFILE' ? "text-main" : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span>Edit Profile</span>
            </div>
            <ChevronRight className={cn(
              "h-3.5 w-3.5 shrink-0 transition-colors",
              activeTab === 'PROFILE' ? "text-main" : "text-gray-400 group-hover:text-gray-600"
            )} />
          </button>

          {/* Password Change */}
          <button
            onClick={() => setActiveTab('PASSWORD')}
            className={cn(
              "group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition-all relative overflow-hidden cursor-pointer",
              activeTab === 'PASSWORD'
                ? "text-main bg-orange-50/50"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {activeTab === 'PASSWORD' && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-main rounded-r-md" />
            )}
            <div className="flex items-center gap-2.5">
              <Lock className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                activeTab === 'PASSWORD' ? "text-main" : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span>Password Change</span>
            </div>
            <ChevronRight className={cn(
              "h-3.5 w-3.5 shrink-0 transition-colors",
              activeTab === 'PASSWORD' ? "text-main" : "text-gray-400 group-hover:text-gray-600"
            )} />
          </button>
        </div>
      </div>

      {/* Right Tab Content Display */}
      <div className="flex-1 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {activeTab === 'PROFILE' ? (
          <EditProfileTab />
        ) : (
          <PasswordChangeTab />
        )}
      </div>

    </div>
  )
}

export default SettingsPage