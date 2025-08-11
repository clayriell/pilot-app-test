"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/service");
      const data = await res.json();
      setServices(data);
    };
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pilotage Service</h1>
        <Link
          href="/service/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Service
        </Link>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Ship Name</th>
            <th className="border p-2">Activity</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Submitter</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s: any) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.ship_name}</td>
              <td className="border p-2">{s.activity}</td>
              <td className="border p-2">{s.from}</td>
              <td className="border p-2">{s.to}</td>
              <td className="border p-2">{s.submited_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
