"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ship, MapPin, User, Calendar, Clock, Package, Filter, Search, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface ServiceRequest {
  id: string;
  ship_name: string;
  activity: string;
  from: string;
  to: string;
  submited_by: string;
  status: string;
  created_at: string;
  priority: string;
  description?: string;
}

export default function ServicePage() {
  const [services, setServices] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for demonstration
        const mockData: ServiceRequest[] = [
          {
            id: "1",
            ship_name: "MV Ocean Explorer",
            activity: "Loading",
            from: "Jakarta Port",
            to: "Surabaya Port",
            submited_by: "Capt. Ahmad Rahman",
            status: "pending",
            priority: "high",
            created_at: "2024-01-15T10:30:00Z",
            description: "Container loading for electronics shipment"
          },
          {
            id: "2",
            ship_name: "SS Marine Voyager",
            activity: "Unloading",
            from: "Singapore Port",
            to: "Jakarta Port",
            submited_by: "Capt. Sarah Johnson",
            status: "approved",
            priority: "medium",
            created_at: "2024-01-14T15:45:00Z",
            description: "Automobile unloading operation"
          },
          {
            id: "3",
            ship_name: "HTS Navigator",
            activity: "Transit",
            from: "Balikpapan Port",
            to: "Singapore Port",
            submited_by: "Capt. Michael Chen",
            status: "completed",
            priority: "low",
            created_at: "2024-01-13T08:20:00Z",
            description: "Crude oil transport transit"
          },
          {
            id: "4",
            ship_name: "MV Island Hopper",
            activity: "Loading",
            from: "Surabaya Port",
            to: "Makassar Port",
            submited_by: "Capt. Lisa Martinez",
            status: "pending",
            priority: "medium",
            created_at: "2024-01-16T09:15:00Z",
            description: "Agricultural products loading"
          }
        ];
        
        setServices(mockData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "approved":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === "all" || service.status === filter;
    const matchesSearch = service.ship_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.to.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: services.length,
    pending: services.filter(s => s.status === "pending").length,
    approved: services.filter(s => s.status === "approved").length,
    completed: services.filter(s => s.status === "completed").length
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg shadow">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Requests</h1>
              <p className="text-gray-600">Manage and track all pilotage service requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Ship className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-100">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Plus className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <Link
                    href="/service-request/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service: ServiceRequest) => (
                <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Ship className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-semibold text-gray-900">{service.ship_name}</h3>
                          <p className="text-sm text-gray-600">{service.activity}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{service.from} → {service.to}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{service.submited_by}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{new Date(service.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(service.priority)}`}>
                          {service.priority} priority
                        </span>
                      </div>
                    </div>

                    {service.description && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{service.description}</p>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <Link
                          href={`/service-request/${service.id}`}
                          className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/service-request/${service.id}/edit`}
                          className="flex-1 text-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Ship className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No service requests found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? `No results for "${searchTerm}"` : "No service requests match your current filters"}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
