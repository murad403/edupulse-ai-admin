'use client'

import React, { useState } from 'react'
import { School } from 'lucide-react'
import SchoolAndClassCard, { SchoolProfile } from './SchoolAndClassCard'
import SchoolAndClassDetailsModal from '@/components/modal/SchoolAndClassDetailsModal'

const mockSchools: SchoolProfile[] = [
  {
    id: '683417',
    name: 'Oakwood High School',
    region: 'Northeast District',
    status: 'ACTIVE',
    staffLeads: 38,
    enrolledStudents: 820,
    apiRequests: '1,450',
    leadCoordinator: 'Dr. Helen Vance',
    registrationDate: 'September 12, 2025',
    gatewayServer: 'ingress-pool-38.edupulse',
    alignmentStatus: 'COMPLIANT'
  },
  {
    id: '492019',
    name: 'Lincoln Magnet Academy',
    region: 'Pacific Northwest',
    status: 'ACTIVE',
    staffLeads: 29,
    enrolledStudents: 610,
    apiRequests: '1,210',
    leadCoordinator: 'Marcus Chen',
    registrationDate: 'October 5, 2025',
    gatewayServer: 'ingress-pool-12.edupulse',
    alignmentStatus: 'COMPLIANT'
  },
  {
    id: '781902',
    name: 'Riverdale STEM Charter',
    region: 'Southeast Coast',
    status: 'ACTIVE',
    staffLeads: 22,
    enrolledStudents: 450,
    apiRequests: '980',
    leadCoordinator: 'Elena Rostova',
    registrationDate: 'November 1, 2025',
    gatewayServer: 'ingress-pool-45.edupulse',
    alignmentStatus: 'COMPLIANT'
  },
  {
    id: '330291',
    name: 'Metropolitan Tech High',
    region: 'Midwest Central',
    status: 'ACTIVE',
    staffLeads: 31,
    enrolledStudents: 740,
    apiRequests: '840',
    leadCoordinator: 'David Kojo',
    registrationDate: 'August 20, 2025',
    gatewayServer: 'ingress-pool-08.edupulse',
    alignmentStatus: 'COMPLIANT'
  },
  {
    id: '109283',
    name: 'Heights Elementary',
    region: 'Rocky Mountains',
    status: 'ACTIVE',
    staffLeads: 18,
    enrolledStudents: 320,
    apiRequests: '620',
    leadCoordinator: 'Amina Al-Jamil',
    registrationDate: 'September 29, 2025',
    gatewayServer: 'ingress-pool-19.edupulse',
    alignmentStatus: 'COMPLIANT'
  },
  {
    id: '582910',
    name: 'Crescent Valley Prep',
    region: 'Southwest Valley',
    status: 'INACTIVE',
    staffLeads: 12,
    enrolledStudents: 210,
    apiRequests: '410',
    leadCoordinator: 'Robert Ramirez',
    registrationDate: 'December 15, 2025',
    gatewayServer: 'ingress-pool-22.edupulse',
    alignmentStatus: 'NON-COMPLIANT'
  }
]

const SchoolsAndClassesPage = () => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolProfile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectSchool = (school: SchoolProfile) => {
    setSelectedSchool(school)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Header Info Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <h3 className="text-base font-bold text-title">District Partners Network</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">
            Browse and coordinate academic institutions utilizing the EduPulse AI assistant frameworks.
          </p>
        </div>
        
        {/* Entries Counter Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-1.5 text-xs font-bold text-gray-500 shadow-sm shrink-0">
          <School className="h-4 w-4 text-gray-400" />
          <span>{mockSchools.length} total register entries</span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSchools.map((school) => (
          <SchoolAndClassCard 
            key={school.id}
            school={school}
            onSelect={handleSelectSchool}
          />
        ))}
      </div>

      {/* Details Modal */}
      <SchoolAndClassDetailsModal 
        school={selectedSchool}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSchool(null)
        }}
      />

    </div>
  )
}

export default SchoolsAndClassesPage