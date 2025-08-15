"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Ship,
  MapPin,
  User,
  Calendar,
  Clock,
  Package,
  Filter,
  Search,
  Plus,
} from "lucide-react";
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
            description: "Container loading for electronics shipment",
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
            description: "Automobile unloading operation",
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
            description: "Crude oil transport transit",
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
            description: "Agricultural products loading",
          },
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

  const filteredServices = services.filter((service) => {
    const matchesFilter = filter === "all" || service.status === filter;
    const matchesSearch =
      service.ship_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.to.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: services.length,
    pending: services.filter((s) => s.status === "pending").length,
    approved: services.filter((s) => s.status === "approved").length,
    completed: services.filter((s) => s.status === "completed").length,
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                New Pilotage Request
              </h1>
            </div>

            {/* new pilotage request form */}
          </div>
        </main>
      </div>
    </div>
  );
}
