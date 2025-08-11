"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => handleNavigate("/pilot-requests")}
          className="bg-blue-500 text-white p-4 rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Pilot Requests
        </button>

        <button
          onClick={() => handleNavigate("/vessels")}
          className="bg-green-500 text-white p-4 rounded-xl shadow-md hover:bg-green-600 transition"
        >
          Vessels
        </button>

        <button
          onClick={() => handleNavigate("/tugs")}
          className="bg-yellow-500 text-white p-4 rounded-xl shadow-md hover:bg-yellow-600 transition"
        >
          Tugs
        </button>

        <button
          onClick={() => handleNavigate("/schedule")}
          className="bg-purple-500 text-white p-4 rounded-xl shadow-md hover:bg-purple-600 transition"
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
