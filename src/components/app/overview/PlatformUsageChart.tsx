'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

import { useGetPlatformUsageQuery } from '@/redux/features/dashboard/dashboard.api'
import { Skeleton } from '@/components/ui/skeleton'

const PlatformUsageChart = () => {
  const { data, isLoading } = useGetPlatformUsageQuery()

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex-1 w-full min-h-[260px] flex items-end gap-4 px-2 pb-4">
          <Skeleton className="h-[20%] flex-1" />
          <Skeleton className="h-[40%] flex-1" />
          <Skeleton className="h-[60%] flex-1" />
          <Skeleton className="h-[50%] flex-1" />
          <Skeleton className="h-[80%] flex-1" />
          <Skeleton className="h-[30%] flex-1" />
          <Skeleton className="h-[70%] flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-50 pt-4 mt-2 gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    )
  }

  const chartData = data?.data?.map(item => ({
    day: item.day.substring(0, 3),
    requests: item.requests
  })) || []

  const maxRequests = data?.data?.reduce((max, item) => item.requests > max ? item.requests : max, 0) || 0
  const maxRequestItem = data?.data && data.data.length > 0
    ? data.data.reduce((max, item) => item.requests >= max.requests ? item : max, data.data[0])
    : null

  // Ensure nice scale ticks even if all requests are 0
  const computedMax = maxRequests > 0 ? Math.ceil((maxRequests * 1.15) / 100) * 100 : 1000
  const computedTicks = [
    0,
    Math.round(computedMax * 0.25),
    Math.round(computedMax * 0.5),
    Math.round(computedMax * 0.75),
    computedMax
  ]

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-title">Platform Usage</h3>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full min-h-[260px] outline-none focus:outline-none **:outline-none **:focus:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            style={{ outline: 'none' }}
          >
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="#F1F5F9"
            />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              domain={[0, computedMax]}
              ticks={computedTicks}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0F172A', 
                borderRadius: '8px', 
                border: 'none',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              labelClassName="text-gray-400 font-semibold"
              formatter={(value) => [`${value} Requests`, 'Usage']}
            />
            <Area 
              type="monotone" 
              dataKey="requests" 
              stroke="#F97316" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRequests)" 
              dot={{ stroke: '#F97316', strokeWidth: 2, fill: '#fff', r: 4 }}
              activeDot={{ stroke: '#F97316', strokeWidth: 2, r: 6, fill: '#F97316' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-50 pt-4 mt-2 text-xs">
        <div className="flex items-center gap-2 text-gray-500 font-semibold mb-2 sm:mb-0">
          <span className="h-2.5 w-2.5 rounded-full bg-main" />
          <span>Daily API Cognitive Requests</span>
        </div>
        <div className="text-gray-400 font-medium">
          Updated Real-time - Peak: {maxRequestItem ? `${maxRequestItem.requests.toLocaleString()} (${maxRequestItem.day.substring(0, 3)})` : '0 (N/A)'}
        </div>
      </div>
    </div>
  )
}

export default PlatformUsageChart