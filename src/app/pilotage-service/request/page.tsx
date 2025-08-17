'use client'

import { useState } from 'react'
import { Clock, Ship, User, MapPin, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

interface ShipRequest {
  id: string
  shipName: string
  pilotName: string
  missionType: string
  location: string
  requestedDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected'
  description: string
  estimatedDuration: string
  cargo: string
  weight: string
}

const mockRequests: ShipRequest[] = [
  {
    id: '1',
    shipName: 'MV Ocean Explorer',
    pilotName: 'Capt. Ahmad Rahman',
    missionType: 'Cargo Transport',
    location: 'Jakarta - Surabaya',
    requestedDate: '2024-01-15',
    priority: 'high',
    status: 'pending',
    description: 'Urgent cargo delivery for medical supplies',
    estimatedDuration: '3 days',
    cargo: 'Medical Supplies',
    weight: '45,000 tons'
  },
  {
    id: '2',
    shipName: 'SS Marine Voyager',
    pilotName: 'Capt. Sarah Johnson',
    missionType: 'Passenger Ferry',
    location: 'Bali - Lombok',
    requestedDate: '2024-01-14',
    priority: 'medium',
    status: 'pending',
    description: 'Regular passenger service route',
    estimatedDuration: '2 hours',
    cargo: 'Passengers',
    weight: '2,500 tons'
  },
  {
    id: '3',
    shipName: 'HTS Navigator',
    pilotName: 'Capt. Michael Chen',
    missionType: 'Oil Transport',
    location: 'Balikpapan - Singapore',
    requestedDate: '2024-01-13',
    priority: 'high',
    status: 'approved',
    description: 'Crude oil shipment for refinery',
    estimatedDuration: '5 days',
    cargo: 'Crude Oil',
    weight: '120,000 tons'
  },
  {
    id: '4',
    shipName: 'MV Island Hopper',
    pilotName: 'Capt. Lisa Martinez',
    missionType: 'Supply Run',
    location: 'Jakarta - Thousand Islands',
    requestedDate: '2024-01-16',
    priority: 'low',
    status: 'pending',
    description: 'Weekly supply delivery to island communities',
    estimatedDuration: '1 day',
    cargo: 'Supplies',
    weight: '8,500 tons'
  },
  {
    id: '5',
    shipName: 'SS Pacific Star',
    pilotName: 'Capt. Robert Wilson',
    missionType: 'Container Transport',
    location: 'Singapore - Jakarta',
    requestedDate: '2024-01-15',
    priority: 'high',
    status: 'pending',
    description: 'Container shipment with electronics',
    estimatedDuration: '4 days',
    cargo: 'Electronics',
    weight: '65,000 tons'
  },
  {
    id: '6',
    shipName: 'MV Coral Princess',
    pilotName: 'Capt. Emma Davis',
    missionType: 'Passenger Cruise',
    location: 'Bali - Komodo',
    requestedDate: '2024-01-14',
    priority: 'medium',
    status: 'approved',
    description: 'Luxury cruise passenger service',
    estimatedDuration: '3 days',
    cargo: 'Passengers',
    weight: '15,000 tons'
  }
]

export default function InboxPage() {
  const [requests, setRequests] = useState<ShipRequest[]>(mockRequests)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ))
  }

  const filteredRequests = requests.filter(req => req.status === filter)

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return sortOrder === 'asc' 
          ? new Date(a.requestedDate).getTime() - new Date(b.requestedDate).getTime()
          : new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime()
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'name':
        return sortOrder === 'asc'
          ? a.shipName.localeCompare(b.shipName)
          : b.shipName.localeCompare(a.shipName)
      default:
        return 0
    }
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            {/* Controls */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Filter Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {(['pending', 'approved', 'rejected'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setFilter(tab)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                            filter === tab
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab} ({requests.filter(r => r.status === tab).length})
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Sort by:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'name')}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="date">Date</option>
                        <option value="priority">Priority</option>
                        <option value="name">Name</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ship Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilot/Captain
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route & Cargo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Ship className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{request.shipName}</div>
                              <div className="text-sm text-gray-500">{request.missionType}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(request.requestedDate).toLocaleDateString('id-ID')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.pilotName}</div>
                          <div className="text-sm text-gray-500">Duration: {request.estimatedDuration}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{request.location}</div>
                          <div className="text-sm text-gray-500">{request.cargo} ({request.weight})</div>
                          <div className="text-xs text-gray-400 mt-1">{request.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                            {request.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{request.status.toUpperCase()}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(request.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                          {request.status !== 'pending' && (
                            <span className="text-gray-400 text-xs">
                              {request.status === 'approved' ? 'Approved' : 'Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {sortedRequests.length === 0 && (
                <div className="text-center py-12">
                  <Ship className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600">There are no requests matching your current filter.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
