'use client'

import React from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuickActionsProps {
  onAddTeacher: () => void
  onAddSchool: () => void
  onGenerateReport: () => void
}

const QuickActions = ({ onAddTeacher, onAddSchool, onGenerateReport }: QuickActionsProps) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]">
      <h3 className="text-base font-bold text-title mb-5">Quick Actions</h3>
      
      <div className="flex-1 flex flex-col justify-center gap-3">
        <Button 
          onClick={onAddTeacher}
          variant="default"
          className="w-full h-11 justify-center gap-2 bg-brand hover:bg-brand-dark cursor-pointer text-sm font-bold shadow-md shadow-orange-500/10 active:scale-[0.98] transition-transform duration-100"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add Teacher</span>
        </Button>
        
        <Button 
          onClick={onAddSchool}
          variant="default"
          className="w-full h-11 justify-center gap-2 bg-brand hover:bg-brand-dark cursor-pointer text-sm font-bold shadow-md shadow-orange-500/10 active:scale-[0.98] transition-transform duration-100"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add School</span>
        </Button>
        
        <Button 
          onClick={onGenerateReport}
          variant="default"
          className="w-full h-11 justify-center gap-2 bg-brand hover:bg-brand-dark cursor-pointer text-sm font-bold shadow-md shadow-orange-500/10 active:scale-[0.98] transition-transform duration-100"
        >
          <Sparkles className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      </div>
    </div>
  )
}

export default QuickActions