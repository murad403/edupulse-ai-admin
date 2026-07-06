'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import StandardsMappingDetailsModal, { StandardItem } from '@/components/modal/StandardsMappingDetailsModal'
import { cn } from '@/lib/utils'

const mockStandards: StandardItem[] = [
  {
    code: 'CCSS.ELA-LITERACY.RL.9-10.1',
    subject: 'English Language Arts',
    grade: '9-10th Grade',
    details: 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.',
    activePlans: 24,
    status: 'FULLY MAPPED',
    authorityAgency: 'National Governors Association'
  },
  {
    code: 'NGSS.HS-PS1-1',
    subject: 'Science',
    grade: 'High School',
    details: 'Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy levels of atoms.',
    activePlans: 18,
    status: 'FULLY MAPPED',
    authorityAgency: 'State Dept of Education'
  },
  {
    code: 'CCSS.MATH.CONTENT.HSA.SSE.A.1',
    subject: 'Mathematics',
    grade: 'High School',
    details: 'Interpret expressions that represent a quantity in terms of its context.',
    activePlans: 32,
    status: 'FULLY MAPPED',
    authorityAgency: 'National Governors Association'
  },
  {
    code: 'C3.SS.9-12.His.1',
    subject: 'Social Studies',
    grade: '9-12th Grade',
    details: 'Evaluate how historical events and developments were shaped by unique circumstances of time and place as well as broader historical contexts.',
    activePlans: 9,
    status: 'PARTIALLY MAPPED',
    authorityAgency: 'NCSS Board of Directors'
  },
  {
    code: 'CCSS.MATH.CONTENT.HSG.CO.A.1',
    subject: 'Mathematics',
    grade: 'High School',
    details: 'Know precise definitions of angle, circle, perpendicular line, parallel line, and line segment, based on the undefined notions of point, line, distance along a line, and distance around a circular arc.',
    activePlans: 0,
    status: 'UNMAPPED',
    authorityAgency: 'National Governors Association'
  }
]

const StandardsMappingPage = () => {
  const [standards] = useState<StandardItem[]>(mockStandards)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStandard, setSelectedStandard] = useState<StandardItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (item: StandardItem) => {
    setSelectedStandard(item)
    setIsModalOpen(true)
  }

  // Filter items based on search query
  const filteredStandards = standards.filter(item => {
    const query = searchQuery.toLowerCase()
    return (
      item.code.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query)
    )
  })

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Search & Info Header Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-left flex-1 min-w-0">
          <h3 className="text-base font-bold text-title">Educational Core Curriculums & Standards</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1 leading-relaxed">
            Configure how the EduPulse Cognitive Generator maps educational goals (such as Core Common standards or NextGen Science Guidelines) directly to active class syllabus blueprints.
          </p>
        </div>
        
        {/* Search input field */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search standards code/subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-1.5 pl-9 pr-4 text-xs text-gray-700 placeholder:text-gray-400 focus:border-main/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 transition-all duration-200 shadow-xs"
          />
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="overflow-x-auto w-full scrollbar-thin">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <th className="p-4 font-extrabold">Standard Code</th>
                <th className="p-4 font-extrabold">Subject / Grade</th>
                <th className="p-4 font-extrabold w-[40%]">Specification Details</th>
                <th className="p-4 font-extrabold text-center">Active Lesson Plans</th>
                <th className="p-4 font-extrabold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStandards.length > 0 ? (
                filteredStandards.map((item, index) => (
                  <tr 
                    key={index} 
                    onClick={() => handleRowClick(item)}
                    className="text-xs text-slate-600 hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    {/* Code */}
                    <td className="p-4 font-bold text-main">
                      {item.code}
                    </td>
                    
                    {/* Subject/Grade */}
                    <td className="p-4">
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-title">{item.subject}</span>
                        <span className="text-[10px] font-semibold text-gray-400 mt-0.5">{item.grade}</span>
                      </div>
                    </td>
                    
                    {/* Specification Details */}
                    <td className="p-4 font-medium text-slate-500 leading-relaxed max-w-xs truncate-2-lines">
                      {item.details}
                    </td>
                    
                    {/* Active Plans */}
                    <td className="p-4 text-center font-extrabold text-slate-800">
                      {item.activePlans}
                    </td>
                    
                    {/* Status Pill */}
                    <td className="p-4 text-right">
                      <span className={cn(
                        "inline-flex rounded-md px-2 py-0.5 text-[9px] font-extrabold tracking-wide uppercase",
                        item.status === 'FULLY MAPPED' && "bg-emerald-50 text-emerald-600",
                        item.status === 'PARTIALLY MAPPED' && "bg-orange-50 text-orange-600",
                        item.status === 'UNMAPPED' && "bg-gray-100 text-gray-400"
                      )}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 font-semibold text-gray-400">
                    No standards matching search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal dialog */}
      <StandardsMappingDetailsModal 
        standard={selectedStandard}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedStandard(null)
        }}
      />

    </div>
  )
}

export default StandardsMappingPage