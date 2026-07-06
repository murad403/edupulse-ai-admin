'use client'

import React, { useState } from 'react'
import AdminSidebar from '@/components/shared/AdminSidebar'
import AdminTopbar from '@/components/shared/AdminTopbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 min-w-0 ${
          isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
        } pl-0`}
      >
        <AdminTopbar onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout