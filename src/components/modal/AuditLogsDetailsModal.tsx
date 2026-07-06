'use client'

import React from 'react'
import { X, ShieldAlert, User, Shield } from 'lucide-react'
import { AuditLogItem } from '@/components/app/audit-logs/AuditLogsPage'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AuditLogsDetailsModalProps {
  log: AuditLogItem | null
  isOpen: boolean
  onClose: () => void
}

const AuditLogsDetailsModal = ({ log, isOpen, onClose }: AuditLogsDetailsModalProps) => {
  if (!isOpen || !log) return null

  // Setup unique details based on the selected log item
  const getHash = (id: string) => {
    if (id === 'log-1') return 'ffcb129990e66c1...82a9'
    if (id === 'log-2') return 'a38190de6181ba4...ef20'
    if (id === 'log-3') return 'c48201faef20d82...f92b'
    if (id === 'log-4') return 'ffcb129990e66c1...82a9'
    if (id === 'log-5') return 'd1283a09ef20bca...881a'
    return 'e91283d8cae1082...442d'
  }

  const getIp = (id: string) => {
    if (id === 'log-2' || id === 'log-5') return '127.0.0.1 (Internal Loopback)'
    return 'ip-92.162.164.240'
  }

  const getDevice = (id: string) => {
    if (id === 'log-2' || id === 'log-5') return 'Core Engine Cron Daemon, Linux Server'
    return 'Chromium Host, MacOS Secure Keychain'
  }

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
          <div className="rounded-xl border border-gray-100 p-4 flex gap-4 bg-gray-50/30 items-start">
            <div className="mt-1 shrink-0">
              <span className={cn(
                "inline-block h-3.5 w-3.5 rounded-full",
                log.dotColor === 'orange' && 'bg-orange-500',
                log.dotColor === 'green' && 'bg-emerald-500',
                log.dotColor === 'blue' && 'bg-sky-500',
                log.dotColor === 'red' && 'bg-red-500'
              )} />
            </div>
            
            <div className="flex flex-col text-left flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider leading-none">
                SECURE SYSTEM LEDGER EVENT
              </span>
              <h3 className="text-sm font-extrabold text-title mt-2 leading-relaxed">
                {log.action}
              </h3>
              <span className="text-[11px] font-semibold text-gray-400 mt-1.5 leading-none">
                Logged: {log.time}
              </span>
            </div>
          </div>

          {/* Signature Details List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              AUDIT TRACE SIGNATURE DETAILS
            </h4>
            
            <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3.5 shadow-xs">
              
              {/* Authenticated Admin */}
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Authenticated Admin</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <User className="h-3.5 w-3.5 text-main" />
                  <span>{log.author}</span>
                </div>
              </div>

              {/* Ingress IP */}
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Terminal Ingress IP</span>
                <span className="text-slate-800 font-mono font-bold">{getIp(log.id)}</span>
              </div>

              {/* Device Footprint */}
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-gray-50 pb-2">
                <span className="text-gray-400 font-medium">Gateway Device footprint</span>
                <span className="text-slate-800 font-bold">{getDevice(log.id)}</span>
              </div>

              {/* Cryptographic Hash */}
              <div className="flex items-center justify-between text-xs py-0.5">
                <span className="text-gray-400 font-medium">Cryptographic Hash (SHA-256)</span>
                <span className="bg-orange-50/50 text-main font-mono font-bold text-[10px] px-2 py-0.5 rounded-md">
                  {getHash(log.id)}
                </span>
              </div>

            </div>
          </div>

          {/* Immutable Event Validation Ledger */}
          <div className="rounded-xl border border-orange-100 bg-orange-50/15 p-4 flex gap-3.5 items-start shadow-xs">
            <div className="mt-0.5 shrink-0">
              <Shield className="h-5 w-5 text-main" />
            </div>
            <div className="text-xs font-semibold text-slate-600 leading-relaxed text-left space-y-1.5">
              <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <span>Immutable Event Validation Ledger</span>
              </div>
              <div>
                This log entry has been verified as cryptographically sound. Any unauthorized manual deletion or overrides of database records will automatically trigger security flags back towards main agencies.
              </div>
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

export default AuditLogsDetailsModal