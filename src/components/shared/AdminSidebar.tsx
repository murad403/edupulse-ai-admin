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
  X
} from 'lucide-react'

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: AdminSidebarProps) => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'User Management', href: '/user-management', icon: Users },
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
        "flex flex-col border-r border-gray-100 bg-white transition-all duration-300 shadow-sm z-50",
        // Desktop positioning & width
        "lg:fixed lg:inset-y-0 lg:left-0 lg:h-screen lg:z-30",
        isCollapsed ? "lg:w-[72px]" : "lg:w-[260px]",
        // Mobile positioning & width
        "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-[260px] max-lg:z-50",
        isMobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 border-b border-gray-50 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main text-white shadow-sm shadow-orange-500/10">
            {/* Hexagon Brand Icon */}
            <svg 
              className="h-5 w-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.7" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="12,3.5 19.5,7.8 19.5,16.2 12,20.5 4.5,16.2 4.5,7.8" fill="none" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div className={cn("flex flex-col tracking-tight transition-all duration-300", isCollapsed ? "lg:opacity-0 lg:w-0" : "opacity-100")}>
            <span className="font-bold text-title text-base leading-tight whitespace-nowrap">
              Teachers<span className="text-main">ai</span>pet
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none whitespace-nowrap">Admin Suite</span>
          </div>
        </div>
        {/* Mobile close button */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all relative overflow-hidden",
                isActive 
                  ? "text-main bg-orange-50/50" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {/* Left active border indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-main rounded-r-md" />
              )}
              
              <item.icon 
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-main" : "text-gray-400 group-hover:text-gray-600"
                )} 
              />
              
              <span className={cn("transition-all duration-300", isCollapsed ? "lg:opacity-0 lg:w-0" : "opacity-100")}>
                {item.name}
              </span>

              {/* Tooltip when collapsed (Desktop only) */}
              {isCollapsed && (
                <div className="max-lg:hidden absolute left-14 rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
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
            <div className={cn("flex flex-col overflow-hidden text-left transition-all duration-300", isCollapsed ? "lg:opacity-0 lg:w-0" : "opacity-100")}>
              <span className="text-xs font-bold text-gray-800 truncate leading-tight whitespace-nowrap">Alex Mercer</span>
              <span className="text-[10px] text-gray-500 truncate leading-none whitespace-nowrap">Super Administrator</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="max-lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
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