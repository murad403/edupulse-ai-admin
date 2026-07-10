'use client'
import React, { useState } from 'react'
import { X, Calendar, School, FileText, Clock, Download } from 'lucide-react'
import { useGetAnalysisReportDetailsQuery } from '@/redux/features/dashboard/dashboard.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { getCurrentUser } from '@/lib/auth'

interface ReportDetailsModalProps {
  reportId: number | null
  isOpen: boolean
  onClose: () => void
}

const ReportDetailsModal = ({ reportId, isOpen, onClose }: ReportDetailsModalProps) => {
  const { data, isLoading, error } = useGetAnalysisReportDetailsQuery(reportId!, {
    skip: !reportId || !isOpen,
  })

  const [isDownloading, setIsDownloading] = useState(false)

  if (!isOpen) return null

  const report = data?.data

  const handleDownload = async () => {
    if (!report) return
    setIsDownloading(true)
    const toastId = toast.loading('Generating PDF download...')
    try {
      const { access } = await getCurrentUser()
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analysis-report/${report.report_id}/download-pdf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access}`
        }
      })
      if (!response.ok) throw new Error('Failed to download PDF')
      const blob = await response.blob()

      const fileName = `${report.school_name.replace(/\s+/g, '_')}_Report_${report.report_id}.pdf`
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Download started!', { id: toastId })
    } catch (err) {
      toast.error('Failed to download PDF.', { id: toastId })
    } finally {
      setIsDownloading(false)
    }
  }

  const formattedDate = report?.created_at
    ? new Date(report.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold text-title mb-6">Pulse AI Report Details</h2>

        {isLoading ? (
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>
          </div>
        ) : error || !report ? (
          <div className="py-8 text-center text-sm text-red-500 font-semibold">
            Failed to load report details. Please try again.
          </div>
        ) : (
          <div className="space-y-6 text-left">
            {/* Meta Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* School Name */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-slate-50/30">
                <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <School className="h-4.5 w-4.5 text-main" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block leading-none">School</span>
                  <span className="text-xs font-bold text-title truncate block mt-1">{report.school_name}</span>
                </div>
              </div>

              {/* Analytical Focus */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-slate-50/30">
                <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <FileText className="h-4.5 w-4.5 text-main" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block leading-none">Analytical Focus</span>
                  <span className="text-xs font-bold text-title truncate block mt-1">{report.analytical_focus}</span>
                </div>
              </div>

              {/* Temporal Bounds */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-slate-50/30">
                <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <Clock className="h-4.5 w-4.5 text-main" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block leading-none">Temporal Bounds</span>
                  <span className="text-xs font-bold text-title block mt-1">{report.temporal_bounds} Days</span>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-slate-50/30">
                <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <Calendar className="h-4.5 w-4.5 text-main" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block leading-none">Generated On</span>
                  <span className="text-xs font-bold text-title block mt-1">{formattedDate}</span>
                </div>
              </div>

            </div>

            {/* Report Content */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-title uppercase tracking-wider">Analysis insights</h3>
              <div className="rounded-xl border border-gray-100 bg-white p-4.5 shadow-sm text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                {report.report_text}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="h-10 px-5 text-xs font-bold cursor-pointer rounded-xl"
              >
                Close
              </Button>
              <Button 
                type="button" 
                disabled={isDownloading}
                onClick={handleDownload}
                className="h-10 px-5 text-xs font-bold bg-main hover:bg-main-dark cursor-pointer text-white shadow-md shadow-orange-500/10 rounded-xl flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportDetailsModal