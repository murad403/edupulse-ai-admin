'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const data = [
  { day: 'Mon', requests: 2760 },
  { day: 'Tue', requests: 3200 },
  { day: 'Wed', requests: 4280 },
  { day: 'Thu', requests: 3900 },
  { day: 'Fri', requests: 4800 },
  { day: 'Sat', requests: 2400 },
  { day: 'Sun', requests: 4000 },
]

const PlatformUsageChart = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[420px]">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-title">Platform Usage</h3>
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>+14.2% up week-over-week</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              domain={[0, 5520]}
              ticks={[0, 1380, 2760, 4140, 5520]}
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
          Updated Real-time - Peak: 4,800 (Fri)
        </div>
      </div>
    </div>
  )
}

export default PlatformUsageChart