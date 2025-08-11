'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: 'up' | 'down'
  icon: LucideIcon
  iconBgColor: string
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconBgColor 
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <span 
              className={`text-xs font-medium ${
                changeType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {changeType === 'up' ? '↑' : '↓'} {change}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              {changeType === 'up' ? 'Up from yesterday' : 'Down from yesterday'}
            </span>
          </div>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}