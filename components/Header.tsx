'use client'

import { useRouter } from 'next/navigation'
import { Search, Bell, Flag } from 'lucide-react'

export default function Header() {
  const router = useRouter()

  const handleProfileClick = () => {
    router.push('/profile')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Language */}
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-4" />
            <span className="text-sm text-gray-600">English</span>
          </div>

          {/* Profile - Clickable */}
          <button 
            onClick={handleProfileClick}
            className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Moni Roy</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
