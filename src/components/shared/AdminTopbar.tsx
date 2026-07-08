'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, Search, Menu, Layout, Settings, LogOut } from 'lucide-react'
import { removeToken } from '@/lib/auth'
import { toast } from 'sonner'

interface AdminTopbarProps {
  onMenuClick?: () => void
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const getTabName = () => {
    if (pathname === '/user-management') return 'User Management'
    if (pathname === '/schools-&-classes') return 'Schools & Classes'
    if (pathname === '/standards-mapping') return 'Standards Mapping'
    if (pathname === '/ai-configuration') return 'AI Configuration'
    if (pathname === '/reports') return 'Reports'
    if (pathname === '/audit-logs') return 'Audit Logs'
    if (pathname === '/settings') return 'System Settings'
    return 'Overview'
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    setDropdownOpen(false)
    const toastId = toast.loading('Logging out...')
    try {
      await removeToken()
      toast.success('Logged out successfully.', { id: toastId })
      router.push('/auth/sign-in')
    } catch (err) {
      console.error('Logout error:', err)
      toast.error('Failed to logout. Please try again.', { id: toastId })
    }
  }

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
            <span>Tab: {getTabName()}</span>
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

        {/* Avatar Dropdown Wrapper */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-9 w-9 overflow-hidden rounded-full border border-gray-200 shadow-sm cursor-pointer hover:border-main transition-colors focus:outline-none focus:ring-2 focus:ring-main/20 flex"
          >
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Alex Mercer"
              className="h-full w-full object-cover"
            />
          </button>

          {/* Backdrop Click Shield */}
          {dropdownOpen && (
            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setDropdownOpen(false)} />
          )}

          {/* Dropdown Menu Box */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1.5 duration-150 text-left">
              <Link 
                href="/settings"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-colors w-full"
              >
                <Settings className="h-4 w-4 text-gray-400" />
                <span>Settings</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50/50 transition-colors w-full border-t border-gray-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar