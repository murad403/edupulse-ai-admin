'use client'
import { useState } from 'react'
import OverviewStats from './OverviewStats'
import PlatformUsageChart from './PlatformUsageChart'
import RecentTeacherActivity from './RecentTeacherActivity'
import QuickActions from './QuickActions'
import TopActiveSchools from './TopActiveSchools'
import AddTeacherModal from '@/components/modal/AddTeacherModal'
import AddSchoolModal from '@/components/modal/AddSchoolModal'
import GenerateReportModal from '@/components/modal/GenerateReportModal'

const OverviewPage = () => {
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false)
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Top Stats Cards */}
      <OverviewStats />

      {/* Middle Section: Chart & Teacher Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PlatformUsageChart />
        </div>
        <div className="xl:col-span-1">
          <RecentTeacherActivity />
        </div>
      </div>

      {/* Bottom Section: Quick Actions, Schools, Audit Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div>
          <QuickActions 
            onAddTeacher={() => setIsAddTeacherOpen(true)}
            onAddSchool={() => setIsAddSchoolOpen(true)}
            onGenerateReport={() => setIsGenerateReportOpen(true)}
          />
        </div>
        <div>
          <TopActiveSchools />
        </div>
      </div>

      {/* Forms & Validation Modals */}
      <AddTeacherModal 
        isOpen={isAddTeacherOpen} 
        onClose={() => setIsAddTeacherOpen(false)} 
      />
      <AddSchoolModal 
        isOpen={isAddSchoolOpen} 
        onClose={() => setIsAddSchoolOpen(false)} 
      />
      <GenerateReportModal 
        isOpen={isGenerateReportOpen} 
        onClose={() => setIsGenerateReportOpen(false)} 
      />
    </div>
  )
}

export default OverviewPage