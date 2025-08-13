'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSave, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface ServiceRequest {
  id: number;
  id_jasa: number;
  ship_name: string;
  pilot: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  pilot_on: string;
  pilot_off: string;
  next_port: string;
  
  // New fields
  doc_number: number;
  master: string;
  agency: string;
  loa: number;
  activity: 'Berthing' | 'Unberthing' | 'SeaTrial' | 'Shifting';
  from: string;
  to: string;
  last_port: string;
  tug_service_id: number;
  note: string;
  amount: number;
  submited_by: string;
  submit_time: string;
  created_by: string;
  createdAt: string;
}

export default function ServiceRequestPage() {
  const router = useRouter();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<ServiceRequest>({
    id: 0,
    id_jasa: 0,
    ship_name: '',
    pilot: '',
    status: 'DRAFT',
    pilot_on: '',
    pilot_off: '',
    next_port: '',
    doc_number: 0,
    master: '',
    agency: '',
    loa: 0,
    activity: 'Berthing',
    from: '',
    to: '',
    last_port: '',
    tug_service_id: 0,
    note: '',
    amount: 0,
    submited_by: '',
    submit_time: '',
    created_by: '',
    createdAt: ''
  });

  const statuses = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'] as const;
  const activities = ['Berthing', 'Unberthing', 'SeaTrial', 'Shifting'] as const;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/service");
        if (!res.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data = await res.json();
        setServiceRequests(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        alert('Gagal mengambil data dari server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id_jasa' || name === 'doc_number' || name === 'loa' || name === 'tug_service_id') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (name === 'amount') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editingId) {
        // Update existing service
        const res = await fetch(`/api/service?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const updatedService = await res.json();
          setServiceRequests(prev => 
            prev.map(item => 
              item.id === editingId ? updatedService : item
            )
          );
          resetForm();
          alert('Data berhasil diupdate!');
        } else {
          const errorData = await res.json();
          alert(`Gagal mengupdate data: ${errorData.error || 'Unknown error'}`);
        }
      } else {
        // Create new service
        const res = await fetch("/api/service/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const newService = await res.json();
          setServiceRequests(prev => [newService, ...prev]);
          resetForm();
          alert('Data berhasil disimpan!');
        } else {
          const errorData = await res.json();
          alert(`Gagal menyimpan data: ${errorData.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data ke server');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      id_jasa: 0,
      ship_name: '',
      pilot: '',
      status: 'DRAFT',
      pilot_on: '',
      pilot_off: '',
      next_port: '',
      doc_number: 0,
      master: '',
      agency: '',
      loa: 0,
      activity: 'Berthing',
      from: '',
      to: '',
      last_port: '',
      tug_service_id: 0,
      note: '',
      amount: 0,
      submited_by: '',
      submit_time: '',
      created_by: '',
      createdAt: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (request: ServiceRequest) => {
    // Convert dates to format suitable for datetime-local input
    const formatDateForInput = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    };

    setFormData({
      ...request,
      pilot_on: formatDateForInput(request.pilot_on),
      pilot_off: formatDateForInput(request.pilot_off),
      submit_time: formatDateForInput(request.submit_time),
      createdAt: formatDateForInput(request.createdAt)
    });
    setEditingId(request.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        setLoading(true);
        const res = await fetch(`/api/service?id=${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setServiceRequests(prev => prev.filter(item => item.id !== id));
          alert('Data berhasil dihapus!');
        } else {
          const errorData = await res.json();
          alert(`Gagal menghapus data: ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Gagal menghapus data dari server');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (request: ServiceRequest) => {
    setViewingId(request.id);
  };

  const closeModal = () => {
    setViewingId(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Request Service</h1>
              <p className="text-gray-600">Kelola permintaan layanan kapal</p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Daftar Permintaan Layanan</h2>
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <FiPlus className="mr-2" />
                Tambah Baru
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Jasa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Kapal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilot On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilot Off
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Port
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                          Loading...
                        </td>
                      </tr>
                    ) : serviceRequests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                          Tidak ada data permintaan layanan
                        </td>
                      </tr>
                    ) : (
                      serviceRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.id_jasa}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.ship_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.pilot}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                              request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                              request.status === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.pilot_on ? new Date(request.pilot_on).toLocaleString('id-ID') : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.pilot_off ? new Date(request.pilot_off).toLocaleString('id-ID') : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.next_port}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(request)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Lihat Detail"
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(request)}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Edit"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Hapus"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {loading ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : serviceRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500">Tidak ada data permintaan layanan</p>
                </div>
              ) : (
                serviceRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-lg shadow p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{request.ship_name}</h3>
                          <p className="text-sm text-gray-600">ID Jasa: {request.id_jasa}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          request.status === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Pilot:</span> {request.pilot}</p>
                        <p><span className="font-medium">Next Port:</span> {request.next_port}</p>
                        <p><span className="font-medium">Pilot On:</span> {request.pilot_on ? new Date(request.pilot_on).toLocaleString('id-ID') : '-'}</p>
                        <p><span className="font-medium">Pilot Off:</span> {request.pilot_off ? new Date(request.pilot_off).toLocaleString('id-ID') : '-'}</p>
                      </div>
                      
                      {/* Mobile Action Buttons */}
                      <div className="flex space-x-2 pt-3 border-t">
                        <button
                          onClick={() => handleView(request)}
                          className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
                        >
                          <FiEye className="mr-1" />
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(request)}
                          className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
                        >
                          <FiTrash2 className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-4 md:p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {editingId ? 'Edit Permintaan Layanan' : 'Tambah Permintaan Layanan'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ID Jasa</label>
                        <input
                          type="number"
                          name="id_jasa"
                          value={formData.id_jasa}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Kapal</label>
                        <input
                          type="text"
                          name="ship_name"
                          value={formData.ship_name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot</label>
                        <input
                          type="text"
                          name="pilot"
                          value={formData.pilot}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot On</label>
                        <input
                          type="datetime-local"
                          name="pilot_on"
                          value={formData.pilot_on}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot Off</label>
                        <input
                          type="datetime-local"
                          name="pilot_off"
                          value={formData.pilot_off}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Next Port</label>
                        <input
                          type="text"
                          name="next_port"
                          value={formData.next_port}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* New fields start */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Doc Number</label>
                        <input
                          type="number"
                          name="doc_number"
                          value={formData.doc_number}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Master</label>
                        <input
                          type="text"
                          name="master"
                          value={formData.master}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Agency</label>
                        <input
                          type="text"
                          name="agency"
                          value={formData.agency}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">LOA</label>
                        <input
                          type="number"
                          name="loa"
                          value={formData.loa}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Activity</label>
                        <select
                          name="activity"
                          value={formData.activity}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          {activities.map(act => (
                            <option key={act} value={act}>{act}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">FROM</label>
                        <input
                          type="text"
                          name="from"
                          value={formData.from}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">TO</label>
                        <input
                          type="text"
                          name="to"
                          value={formData.to}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Port</label>
                        <input
                          type="text"
                          name="last_port"
                          value={formData.last_port}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tug Service ID</label>
                        <input
                          type="number"
                          name="tug_service_id"
                          value={formData.tug_service_id}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <input
                          type="text"
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Submitted By</label>
                        <input
                          type="text"
                          name="submited_by"
                          value={formData.submited_by}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Created By</label>
                        <input
                          type="text"
                          name="created_by"
                          value={formData.created_by}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          <FiX className="inline mr-1" />
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                          <FiSave className="inline mr-1" />
                          {loading ? 'Menyimpan...' : (editingId ? 'Update' : 'Simpan')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Detail Modal */}
            {viewingId && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-4 md:p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      Detail Permintaan Layanan
                    </h3>
                    
                    {(() => {
                      const request = serviceRequests.find(r => r.id === viewingId);
                      if (!request) return null;
                      
                      return (
                        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                          <div>
                            <span className="font-medium">ID Jasa:</span> {request.id_jasa}
                          </div>
                          <div>
                            <span className="font-medium">Nama Kapal:</span> {request.ship_name}
                          </div>
                          <div>
                            <span className="font-medium">Pilot:</span> {request.pilot}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> {request.status}
                          </div>
                          <div>
                            <span className="font-medium">Pilot On:</span> {request.pilot_on ? new Date(request.pilot_on).toLocaleString('id-ID') : '-'}
                          </div>
                          <div>
                            <span className="font-medium">Pilot Off:</span> {request.pilot_off ? new Date(request.pilot_off).toLocaleString('id-ID') : '-'}
                          </div>
                          <div>
                            <span className="font-medium">Next Port:</span> {request.next_port}
                          </div>
                          
                          {/* New fields in detail view */}
                          <div>
                            <span className="font-medium">Doc Number:</span> {request.doc_number}
                          </div>
                          <div>
                            <span className="font-medium">Master:</span> {request.master}
                          </div>
                          <div>
                            <span className="font-medium">Agency:</span> {request.agency}
                          </div>
                          <div>
                            <span className="font-medium">LOA:</span> {request.loa}
                          </div>
                          <div>
                            <span className="font-medium">Activity:</span> {request.activity}
                          </div>
                          <div>
                            <span className="font-medium">FROM:</span> {request.from}
                          </div>
                          <div>
                            <span className="font-medium">TO:</span> {request.to}
                          </div>
                          <div>
                            <span className="font-medium">Last Port:</span> {request.last_port}
                          </div>
                          <div>
                            <span className="font-medium">Tug Service ID:</span> {request.tug_service_id}
                          </div>
                          <div>
                            <span className="font-medium">Note:</span> {request.note}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span> {request.amount}
                          </div>
                          <div>
                            <span className="font-medium">Submitted By:</span> {request.submited_by}
                          </div>
                          <div>
                            <span className="font-medium">Created By:</span> {request.created_by}
                          </div>
                          
                          <div className="flex justify-end pt-4">
                            <button
                              onClick={closeModal}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                              Tutup
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
