'use client'

import React, { useState } from 'react'
import { School } from 'lucide-react'
import SchoolAndClassCard from './SchoolAndClassCard'
import SchoolAndClassDetailsModal from '@/components/modal/SchoolAndClassDetailsModal'
import { useGetSchoolsQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'

const SchoolsAndClassesPage = () => {
  const { data, isLoading } = useGetSchoolsQuery()
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectSchool = (schoolId: number) => {
    setSelectedSchoolId(schoolId)
    setIsModalOpen(true)
  }

  const schools = data?.data?.results || []

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Header Info Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-left flex-1 min-w-0">
          <h3 className="text-base font-bold text-title">District Partners Network</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">
            Browse and coordinate academic institutions utilizing the EduPulse AI assistant frameworks.
          </p>
        </div>
        
        {/* Entries Counter Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-1.5 text-xs font-bold text-gray-500 shadow-sm shrink-0">
          <School className="h-4 w-4 text-gray-400" />
          {isLoading ? (
            <Skeleton className="h-4 w-12" />
          ) : (
            <span>{schools.length} total register entries</span>
          )}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between h-[160px] animate-pulse">
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
                <Skeleton className="h-4 w-12 rounded-md shrink-0" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex flex-col items-center justify-center bg-slate-50/65 py-2.5 px-1.5 rounded-lg border border-slate-100/50 gap-1.5">
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-4 w-6" />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : schools.length > 0 ? (
          schools.map((school) => (
            <SchoolAndClassCard 
              key={school.school_id}
              school={school}
              onSelect={handleSelectSchool}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-sm text-gray-400 font-semibold bg-white border border-gray-100 rounded-xl">
            No registered schools found.
          </div>
        )}
      </div>

      {/* Details Modal */}
      <SchoolAndClassDetailsModal 
        schoolId={selectedSchoolId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSchoolId(null)
        }}
      />

    </div>
  )
}

export default SchoolsAndClassesPage