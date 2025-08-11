"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    doc_number: "",
    id_jasa: "",
    ship_name: "",
    master: "",
    agency: "",
    loa: "",
    activity: "Berthing",
    from: "",
    to: "",
    last_port: "batu ampar",
    next_port: "batu ampar",
    pilot: "",
    pilot_on: "",
    pilot_off: "",
    tug_service_id: 2,
    note: "",
    status: "DRAFT",
    amount: "",
    submited_by: "",
    created_by: "",
  });

  // daftar field numeric
  const numberFields = ["doc_number", "id_jasa", "loa", "tug_service_id", "amount"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // kalau tipe number atau termasuk numberFields → ubah jadi Number
    if (type === "number" || numberFields.includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/service/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/service");
    } else {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Pilotage Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="doc_number" placeholder="Doc Number" type="number" onChange={handleChange} className="w-full p-2 border" required />
        <input name="id_jasa" placeholder="ID Jasa" type="number" onChange={handleChange} className="w-full p-2 border" required />
        <input name="ship_name" placeholder="Nama Kapal" onChange={handleChange} className="w-full p-2 border" required />
        <input name="master" placeholder="Master" onChange={handleChange} className="w-full p-2 border" />
        <input name="agency" placeholder="Agency" onChange={handleChange} className="w-full p-2 border" />
        <input name="loa" placeholder="LOA" type="number" onChange={handleChange} className="w-full p-2 border" />
        <select name="activity" onChange={handleChange} className="w-full p-2 border">
          <option value="Berthing">Berthing</option>
          <option value="Unberthing">Unberthing</option>
          <option value="Sea_Trial">Sea Trial</option>
          <option value="Shifting">Shifting</option>
        </select>
        <input name="from" placeholder="From" onChange={handleChange} className="w-full p-2 border" />
        <input name="to" placeholder="To" onChange={handleChange} className="w-full p-2 border" />
        <input name="pilot" placeholder="Pilot" onChange={handleChange} className="w-full p-2 border" />
        <input name="pilot_on" type="datetime-local" onChange={handleChange} className="w-full p-2 border" />
        <input name="pilot_off" type="datetime-local" onChange={handleChange} className="w-full p-2 border" />
        <input name="tug_service_id" placeholder="Tug Service ID" type="number" onChange={handleChange} className="w-full p-2 border" />
        <input name="amount" placeholder="Amount" type="number" onChange={handleChange} className="w-full p-2 border" />
        <input name="submited_by" placeholder="Submitted by" onChange={handleChange} className="w-full p-2 border" />
        <input name="created_by" placeholder="Created by" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </main>
  );
}

