'use client'

import React, { useState } from 'react'
import { Clock } from 'lucide-react'
import AuditLogsDetailsModal from '@/components/modal/AuditLogsDetailsModal'
import { cn } from '@/lib/utils'

export interface AuditLogItem {
  id: string
  action: string
  author: string
  subsystem: string
  time: string
  dotColor: 'orange' | 'green' | 'blue' | 'red'
}

const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'log-1',
    action: 'New teacher account created for Sarah Jenkins',
    author: 'Alex Mercer',
    subsystem: 'System Secure Core',
    time: '5 mins ago',
    dotColor: 'orange'
  },
  {
    id: 'log-2',
    action: 'Core system health check passed (98.4%)',
    author: 'System Cron',
    subsystem: 'System Secure Core',
    time: '12 mins ago',
    dotColor: 'green'
  },
  {
    id: 'log-3',
    action: 'AP Calculus curriculum mapped to NGSS guidelines',
    author: 'Alex Mercer',
    subsystem: 'System Secure Core',
    time: '45 mins ago',
    dotColor: 'blue'
  },
  {
    id: 'log-4',
    action: 'AI response temperature adjusted to 0.47 for testing module',
    author: 'Alex Mercer',
    subsystem: 'System Secure Core',
    time: '2 hours ago',
    dotColor: 'orange'
  },
  {
    id: 'log-5',
    action: 'Database replication backup completed successfully',
    author: 'System Backup',
    subsystem: 'System Secure Core',
    time: '4 hours ago',
    dotColor: 'green'
  },
  {
    id: 'log-6',
    action: 'API Key rotated for Gemini Classroom Assist service Integration',
    author: 'Elena Rostova',
    subsystem: 'System Secure Core',
    time: '1 day ago',
    dotColor: 'red'
  }
]

const AuditLogsPage = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (log: AuditLogItem) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Header Info Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm text-left">
        <div className="flex items-start gap-3.5">
          <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <Clock className="h-4.5 w-4.5 text-main" />
          </div>
          <div>
            <h3 className="text-base font-bold text-title">Full System Audit Timelines</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">
              A non-volatile historical ledger mapping all modifications, logins, configurations, and API changes.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Logs list card */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm text-left space-y-1">
        {mockAuditLogs.map((log, index) => (
          <div 
            key={log.id}
            onClick={() => handleRowClick(log)}
            className="flex items-start justify-between gap-4 p-4 rounded-xl hover:bg-gray-50/70 transition-all duration-200 cursor-pointer"
          >
            {/* Left Dot + Details */}
            <div className="flex items-start gap-4 min-w-0">
              {/* Dot indicator */}
              <div className="mt-1.5 shrink-0 relative flex items-center justify-center">
                <span className={cn(
                  "h-3 w-3 rounded-full",
                  log.dotColor === 'orange' && 'bg-orange-500 shadow-sm shadow-orange-500/10',
                  log.dotColor === 'green' && 'bg-emerald-500 shadow-sm shadow-emerald-500/10',
                  log.dotColor === 'blue' && 'bg-sky-500 shadow-sm shadow-sky-500/10',
                  log.dotColor === 'red' && 'bg-red-500 shadow-sm shadow-red-500/10'
                )} />
                {index < mockAuditLogs.length - 1 && (
                  <div className="absolute top-5 bottom-[-28px] left-[5px] w-px bg-gray-100 hidden sm:block" />
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex flex-col text-left min-w-0">
                <h4 className="text-xs font-bold text-title leading-normal">
                  {log.action}
                </h4>
                
                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-semibold text-gray-400">
                  <span>By: {log.author}</span>
                  <span>•</span>
                  <span>{log.subsystem}</span>
                </div>
              </div>
            </div>

            {/* Right Timestamp */}
            <span className="text-[10px] font-bold text-gray-400 shrink-0 mt-0.5">
              {log.time}
            </span>

          </div>
        ))}
      </div>

      {/* Details Modal */}
      <AuditLogsDetailsModal 
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedLog(null)
        }}
      />

    </div>
  )
}

export default AuditLogsPage