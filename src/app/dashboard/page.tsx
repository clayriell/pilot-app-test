'use client'

import { Users, ShoppingCart, DollarSign, Clock, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import SalesChart from '@/components/SalesChart'

export default function Dashboard() {
  const router = useRouter()

  const handleProductClick = () => {
    router.push('/product-label')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total User"
                value="40,689"
                change="8.5%"
                changeType="up"
                icon={Users}
                iconBgColor="bg-purple-500"
              />
              <StatCard
                title="Total Order"
                value="10293"
                change="1.3%"
                changeType="up"
                icon={ShoppingCart}
                iconBgColor="bg-orange-500"
              />
              <StatCard
                title="Total Sales"
                value="$89,000"
                change="4.3%"
                changeType="down"
                icon={DollarSign}
                iconBgColor="bg-green-500"
              />
              <StatCard
                title="Total Pending"
                value="2040"
                change="1.8%"
                changeType="up"
                icon={Clock}
                iconBgColor="bg-red-500"
              />
            </div>

            {/* Sales Chart */}
            <div className="mb-8">
              <SalesChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
