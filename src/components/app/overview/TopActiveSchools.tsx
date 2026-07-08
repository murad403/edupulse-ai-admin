'use client'

import { useGetTopSchoolsQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'

const TopActiveSchools = () => {
  const { data, isLoading } = useGetTopSchoolsQuery()

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]">
        <h3 className="text-base font-bold text-title mb-4">Top Active Schools</h3>
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const schools = data?.data || []

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]">
      <h3 className="text-base font-bold text-title mb-4">Top Active Schools</h3>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {schools.length > 0 ? (
            schools.map((school) => (
              <div key={school.school_id} className="flex items-center justify-between text-xs py-0.5">
                <span className="font-bold text-slate-700">{school.school_name}</span>
                <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  {school.total_ai_requests.toLocaleString()} reqs
                </span>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-xs text-gray-400 font-medium">
              No active schools found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopActiveSchools