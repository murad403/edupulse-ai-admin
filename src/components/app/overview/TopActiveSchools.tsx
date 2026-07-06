'use client'

import React from 'react'

interface SchoolActivity {
  name: string
  requests: string
}

const schools: SchoolActivity[] = [
  { name: 'Oakwood High School', requests: '1,450 reqs' },
  { name: 'Lincoln Magnet Academy', requests: '1,218 reqs' },
  { name: 'Riverdale STEM Charter', requests: '980 reqs' },
  { name: 'Metropolitan Tech High', requests: '840 reqs' },
  { name: 'Heights Elementary', requests: '620 reqs' }
]

const TopActiveSchools = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]">
      <h3 className="text-base font-bold text-title mb-4">Top Active Schools</h3>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {schools.map((school, index) => (
            <div key={index} className="flex items-center justify-between text-xs py-0.5">
              <span className="font-bold text-slate-700">{school.name}</span>
              <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {school.requests}
              </span>
            </div>
          ))}
        </div>
        
        <button className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-all text-center mt-3 cursor-pointer">
          View All District Affiliates
        </button>
      </div>
    </div>
  )
}

export default TopActiveSchools