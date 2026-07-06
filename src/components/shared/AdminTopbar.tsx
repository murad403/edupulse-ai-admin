'use client'

import React from 'react'
import { Bell, Search, Menu, Layout } from 'lucide-react'

interface AdminTopbarProps {
  onMenuClick?: () => void
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 md:px-6 backdrop-blur-md">
      {/* Left side: Panel Title & Badge */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold text-title tracking-tight">Admin Panel</h1>
          
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-gray-500 shadow-sm">
            <Layout className="h-3 w-3 text-gray-400" />
            <span>Tab: Overview</span>
          </div>
        </div>
      </div>

      {/* Middle side: Search input */}
      <div className="hidden md:flex flex-1 max-w-sm mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full rounded-full border border-gray-100 bg-gray-50 py-1.5 pl-9 pr-4 text-xs text-gray-700 placeholder:text-gray-400 focus:border-main/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side: Notifications & Avatar */}
      <div className="flex items-center gap-4">
        {/* Search button for mobile only */}
        <button className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer">
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-200 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Alex Mercer"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar