'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  School, 
  Compass, 
  Sliders, 
  FileBarChart, 
  LayoutGrid, 
  Clock, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed }: AdminSidebarProps) => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Schools & Classes', href: '/schools', icon: School },
    { name: 'Standards Mapping', href: '/standards', icon: Compass },
    { name: 'AI Configuration', href: '/ai-config', icon: Sliders },
    { name: 'Reports', href: '/reports', icon: FileBarChart },
    { name: 'Content Templates', href: '/content-templates', icon: LayoutGrid },
    { name: 'Audit Logs', href: '/audit-logs', icon: Clock },
    { name: 'System Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-gray-100 bg-white transition-all duration-300 shadow-sm",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 border-b border-gray-50 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand shadow-sm shadow-orange-500/10">
            {/* Orange Brand Icon */}
            <svg 
              className="h-6 w-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col tracking-tight transition-opacity duration-300">
              <span className="font-bold text-title text-base leading-tight">EduPulse <span className="text-brand">AI</span></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Admin Suite</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
        {navItems.map((item) => {
          // In this static mock, only the overview Page (/) is active
          const isActive = item.href === '/' || pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all relative overflow-hidden",
                isActive 
                  ? "text-brand bg-orange-50/50" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {/* Left active border indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand rounded-r-md" />
              )}
              
              <item.icon 
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-brand" : "text-gray-400 group-hover:text-gray-600"
                )} 
              />
              
              {!isCollapsed && (
                <span className="transition-opacity duration-300">{item.name}</span>
              )}

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-14 rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Collapse Trigger Footer */}
      <div className="border-t border-gray-100 p-3 bg-gray-50/40">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Alex Mercer"
              className="h-9 w-9 shrink-0 rounded-full border border-gray-200 object-cover"
            />
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden text-left">
                <span className="text-xs font-bold text-gray-800 truncate leading-tight">Alex Mercer</span>
                <span className="text-[10px] text-gray-500 truncate leading-none">Super Administrator</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar