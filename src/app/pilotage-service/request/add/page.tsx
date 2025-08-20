"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface PilotageServiceForm {
  idJasa?: string;
  agencyId: string;
  companyId: string;
  terminalStartId: string;
  terminalEndId: string;
  lastPort: string;
  nextPort: string;
  pilotId: string;
  startDate: string;
  startTime: string;
  status: string;
  amount?: number;

  // ship detail
  shipName: string;
  master: string;
  GRT: number;
  loa: number;
  flag: string;

  // tug service
  tugIdJasa?: string;
  tugAmount?: number;

  // tug service detail
  assistTugId: string;
  connectTime: string;
  disconnectTime: string;
}

export default function PilotageServicePage() {
  const { register, handleSubmit, reset } = useForm<PilotageServiceForm>();
  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit: SubmitHandler<PilotageServiceForm> = async (data) => {
    try {
      const res = await fetch("/api/pilotage-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal mengirim data");

      const result = await res.json();
      setSubmittedData(result);
      reset();
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat submit");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tambah Pilotage Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pilotage Service */}
        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Pilotage Service</h2>
          <input
            {...register("idJasa")}
            placeholder="idJasa (opsional)"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("agencyId", { required: true })}
            placeholder="Agency ID"
            className="w-full p-2 border rounded"
          />

          <select
            {...register("companyId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Company</option>
            <option value="1">Company 1</option>
            <option value="2">Company 2</option>
          </select>

          <select
            {...register("terminalStartId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Terminal Start</option>
            <option value="A">Terminal A</option>
            <option value="B">Terminal B</option>
          </select>

          <select
            {...register("terminalEndId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Terminal End</option>
            <option value="C">Terminal C</option>
            <option value="D">Terminal D</option>
          </select>

          <input
            {...register("lastPort")}
            placeholder="Last Port"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("nextPort")}
            placeholder="Next Port"
            className="w-full p-2 border rounded"
          />

          <select
            {...register("pilotId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Pilot</option>
            <option value="101">Pilot 101</option>
            <option value="102">Pilot 102</option>
          </select>

          <input
            type="date"
            {...register("startDate")}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            {...register("startTime")}
            className="w-full p-2 border rounded"
          />

          <input type="hidden" value="REQUESTED" {...register("status")} />
          <input
            type="number"
            {...register("amount")}
            placeholder="Amount (opsional)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ship Detail */}
        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Ship Detail</h2>
          <input
            {...register("shipName", { required: true })}
            placeholder="Ship Name"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("master")}
            placeholder="Master"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register("GRT", { valueAsNumber: true })}
            placeholder="GRT"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register("loa", { valueAsNumber: true })}
            placeholder="LOA"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("flag")}
            placeholder="Flag"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tug Service */}
        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Tug Service</h2>
          <input
            {...register("tugIdJasa")}
            placeholder="Tug idJasa (opsional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register("tugAmount", { valueAsNumber: true })}
            placeholder="Tug Amount (opsional)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tug Service Detail */}
        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Tug Service Detail</h2>
          <input
            {...register("assistTugId")}
            placeholder="Assist Tug ID"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("connectTime")}
            placeholder="Connect Time"
            className="w-full p-2 border rounded"
          />
          <input
            {...register("disconnectTime")}
            placeholder="Disconnect Time"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* hasil response */}
      {submittedData && (
        <div className="mt-8 bg-gray-100 p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Response API:</h2>
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
