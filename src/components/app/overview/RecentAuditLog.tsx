'use client'

import React from 'react'

interface AuditItem {
  message: string
  time: string
}

const audits: AuditItem[] = [
  { message: 'New teacher account created for Sarah Jenkins', time: '5 mins ago' },
  { message: 'Core system health check passed (98.4%)', time: '12 mins ago' },
  { message: 'AP Calculus curriculum mapped to NGSS guidelines', time: '45 mins ago' },
  { message: 'AI response temperature adjusted to 0.47 for testing module', time: '2 hours ago' }
]

const RecentAuditLog = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]">
      <h3 className="text-base font-bold text-title mb-4">Recent Audit Log</h3>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          {audits.map((audit, index) => (
            <div key={index} className="flex gap-3 items-start">
              {/* Timeline Orange Dot */}
              <div className="mt-1.5 shrink-0 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-main ring-[3px] ring-orange-100" />
              </div>
              
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold text-slate-700 leading-tight">
                  {audit.message}
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  {audit.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-all text-center mt-3 cursor-pointer">
          Inspect complete timeline history
        </button>
      </div>
    </div>
  )
}

export default RecentAuditLog