'use client'
import { cn } from '@/lib/utils'

import { useGetTeachersActivityQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

const RecentTeacherActivity = () => {
  const { data, isLoading } = useGetTeachersActivityQuery()

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
        <h3 className="text-base font-bold text-title mb-4">Recent Teacher Activity</h3>
        <div className="flex-1 overflow-hidden">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50/50">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-9.5 w-full rounded-lg mt-4" />
      </div>
    )
  }

  const activities = data?.data?.results || []

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
      <h3 className="text-base font-bold text-title mb-4">Recent Teacher Activity</h3>
      
      {/* Table Area */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              <th className="pb-3 font-extrabold">Name</th>
              <th className="pb-3 font-extrabold">School</th>
              <th className="pb-3 font-extrabold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activities.length > 0 ? (
              activities.map((activity) => {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.teacher_name)}&background=F97316&color=fff`
                return (
                  <tr key={activity.teacher_id} className="text-xs text-slate-700 hover:bg-gray-50/50 transition-colors">
                    <td className="py-2.5 flex items-center gap-2.5 font-bold text-title">
                      <img 
                        src={avatarUrl} 
                        alt={activity.teacher_name} 
                        className="h-6 w-6 rounded-full object-cover border border-gray-100"
                      />
                      <span>{activity.teacher_name}</span>
                    </td>
                    <td className="py-2.5 text-gray-500 font-semibold">{activity.school_name || 'N/A'}</td>
                    <td className="py-2.5 text-right">
                      <span className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wide uppercase",
                        activity.status === 'approved' 
                          ? "bg-emerald-50 text-emerald-600" 
                          : activity.status === 'pending'
                          ? "bg-amber-50 text-amber-600"
                          : "bg-gray-100 text-gray-400"
                      )}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={3} className="py-10 text-center text-xs text-gray-400 font-medium">
                  No recent activities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Button */}
      <Link href={"/user-management"} className="w-full rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 transition-colors cursor-pointer text-center mt-4">
        Manage Teachers directory
      </Link>
    </div>
  )
}

export default RecentTeacherActivity