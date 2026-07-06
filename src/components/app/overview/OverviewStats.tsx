'use client'

import React from 'react'
import { Users, School, Zap, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const OverviewStats = () => {
  const stats = [
    {
      title: 'Total Teachers',
      value: '142',
      icon: Users,
      iconColor: 'text-brand',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    },
    {
      title: 'Active Schools',
      value: '11',
      icon: School,
      iconColor: 'text-brand',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    },
    {
      title: 'AI Requests Today',
      value: '3,840',
      icon: Zap,
      iconColor: 'text-brand',
      iconBg: 'bg-orange-50',
      valueColor: 'text-title'
    },
    {
      title: 'System Health',
      value: '98%',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      valueColor: 'text-emerald-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                {stat.value}
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