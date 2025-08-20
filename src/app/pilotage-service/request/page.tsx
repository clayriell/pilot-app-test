"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface ShipDetail {
  id: number;
  shipName: string;
  master: string;
  grt: number;
  loa: number;
  flag: string;
}
interface PilotageService {
  id: number;
  idJasa: string;
  agencyId: string;
  terminalStartId: string;
  terminalEndId: string;
  lastPort: string;
  nextPort: string;
  startDate: string;
  startTime: string;
  amount: number;
  activity: string;
  agency: {
    id: number;
    name: string;
  };
  terminalStart: {
    id: number;
    name: string;
  };
  terminalEnd: {
    id: number;
    name: string;
  };
  shipDetails: ShipDetail[];
}

export default function PilotagePage() {
  const [services, setServices] = useState<PilotageService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/pilotage-service");
        const data: PilotageService[] = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-full mx-auto">
            <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Jasa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Kapal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keagenan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Terminal
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Port
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimasi Kegiatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nominal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kegiatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service, index) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.idJasa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.shipDetails.map((ship) => (
                          <div key={ship.id}>{ship.shipName}</div>
                        ))}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.agency.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Dari: {service.terminalStart.name} <br />
                        Ke:{service.terminalEnd.name}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        Dari: {service.lastPort} <br />
                        Ke: {service.nextPort}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(service.startDate).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}{" "}
                        <br />
                        Pukul :
                        {new Date(service.startTime).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="Detail"
                          >
                            <Eye className="w-10 h-10" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-8 h-8" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-8 h-8" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-6 text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
