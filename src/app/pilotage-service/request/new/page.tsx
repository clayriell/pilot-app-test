"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ship, User, Plus, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [detailForms, setDetailForms] = useState<Array<{ id: number }>>([]);
  const [detailData, setDetailData] = useState<Record<number, any>>({});

  // ✅ Field service terbaru
  const [form, setForm] = useState({
    idJasa: "",
    agencyId: "",
    companyId: "",
    activity: "",
    terminalStartId: "",
    terminalEndId: "",
    lastPort: "",
    nextPort: "",
    pilotId: "",
    startDate: "",
    startTime: "",
    status: "REQUESTED",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setForm({ ...form, [name]: Number(value) });
    }
  };

  const handleDetailChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetailData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleDetailNumberBlur = (
    id: number,
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (value !== "") {
      setDetailData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [name]: Number(value),
        },
      }));
    }
  };

  const addDetailForm = () => {
    const newId = Date.now();
    setDetailForms((prev) => [...prev, { id: newId }]);
    setDetailData((prev) => ({
      ...prev,
      [newId]: {
        ship_name: "",
        master: "",
        grt: "",
        loa: "",
        pilot: "",
        amount: "",
      },
    }));
  };

  const removeDetailForm = (id: number) => {
    setDetailForms((prev) => prev.filter((form) => form.id !== id));
    setDetailData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitData = {
      ...form,
      idJasa: form.idJasa ? Number(form.idJasa) : 0,
      agencyId: form.agencyId ? Number(form.agencyId) : 0,
      companyId: form.companyId ? Number(form.companyId) : 0,
      terminalStartId: form.terminalStartId ? Number(form.terminalStartId) : 0,
      terminalEndId: form.terminalEndId ? Number(form.terminalEndId) : 0,
      pilotId: form.pilotId ? Number(form.pilotId) : 0,
      amount: form.amount ? Number(form.amount) : 0,
      details: Object.values(detailData),
    };

    try {
      const res = await fetch("/api/pilotage-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/service-request");
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/service-request");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Informasi Kegiatan */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Ship className="w-5 h-5 mr-2 text-blue-600" />
                    Informasi Kegiatan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Jasa
                      </label>
                      <input
                        name="idJasa"
                        value={form.idJasa}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency
                      </label>
                      <input
                        type="text"
                        name="agencyId"
                        value={form.agencyId}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BUP (Company)
                      </label>
                      <input
                        type="text"
                        name="companyId"
                        value={form.companyId}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Detail Service */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kegiatan
                      </label>
                      <select
                        name="activity"
                        value={form.activity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">-- Pilih --</option>
                        <option value="Berthing">Berthing</option>
                        <option value="Unberthing">Unberthing</option>
                        <option value="Sea_Trial">Sea Trial</option>
                        <option value="Shifting">Shifting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Lokasi & Pelabuhan */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Terminal Awal
                      </label>
                      <input
                        type="text"
                        name="terminalStartId"
                        value={form.terminalStartId}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Terminal Tujuan
                      </label>
                      <input
                        type="text"
                        name="terminalEndId"
                        value={form.terminalEndId}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Port
                      </label>
                      <input
                        type="text"
                        name="lastPort"
                        value={form.lastPort}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Next Port
                      </label>
                      <input
                        type="text"
                        name="nextPort"
                        value={form.nextPort}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Detail Kapal Dinamis */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Detail Kapal
                    </h2>
                    <button
                      type="button"
                      onClick={addDetailForm}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Detail Kapal</span>
                    </button>
                  </div>

                  {detailForms.map((formItem) => (
                    <div
                      key={formItem.id}
                      className="border border-gray-200 rounded-lg p-4 mb-4 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeDetailForm(formItem.id)}
                        className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Kapal
                          </label>
                          <input
                            type="text"
                            name="ship_name"
                            value={detailData[formItem.id]?.ship_name || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Master
                          </label>
                          <input
                            type="text"
                            name="master"
                            value={detailData[formItem.id]?.master || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GRT
                          </label>
                          <input
                            type="text"
                            name="grt"
                            value={detailData[formItem.id]?.grt || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            LOA (m)
                          </label>
                          <input
                            type="number"
                            name="loa"
                            value={detailData[formItem.id]?.loa || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            onBlur={(e) =>
                              handleDetailNumberBlur(formItem.id, e)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilot
                          </label>
                          <input
                            type="text"
                            name="pilot"
                            value={detailData[formItem.id]?.pilot || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                          </label>
                          <input
                            type="number"
                            name="amount"
                            value={detailData[formItem.id]?.amount || ""}
                            onChange={(e) => handleDetailChange(formItem.id, e)}
                            onBlur={(e) =>
                              handleDetailNumberBlur(formItem.id, e)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {detailForms.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Belum ada detail kapal ditambahkan
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
