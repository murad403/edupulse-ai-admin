'use client'
import { Users, School, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useGetDashboardStatsQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'

const OverviewStats = () => {
  const { data, isLoading } = useGetDashboardStatsQuery()

  const stats = [
    {
      title: 'Total Teachers',
      value: data?.data?.total_teachers,
      icon: Users,
      iconColor: 'text-main',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    },
    {
      title: 'Active Schools',
      value: data?.data?.active_schools,
      icon: School,
      iconColor: 'text-main',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    },
    {
      title: 'AI Requests Today',
      value: data?.data?.today_ai_requests,
      icon: Zap,
      iconColor: 'text-main',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div 
            key={index}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</span>
              <span className={cn("text-3xl font-extrabold tracking-tight", stat.valueColor)}>
                {isLoading ? (
                  <Skeleton className="h-9 w-20" />
                ) : (
                  (stat.value ?? 0).toLocaleString()
                )}
              </span>
            </div>
            
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-inner", stat.iconBg)}>
              <Icon className={cn("h-5 w-5", stat.iconColor)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OverviewStats