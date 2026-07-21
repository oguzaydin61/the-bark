import React, { useState } from 'react'
import { CUSTOMER_REQUESTS } from '../utils/placeholderData'
import { X } from 'lucide-react'


interface RequestType {
  id: number
  customerName: string
  company: string
  title: string
  description: string
  estimatedBudget: string
  date: string
  status: string
}

function CustomerRequests() {
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null)

  return (
    <div className='w-full h-full min-h-screen bg-dashboard relative'>
      <div className='w-full h-full'>
        <div className='text-4xl px-10 py-10 font-bold text-gray-800'>
          Müşteri Talepleri
        </div>

        <div className='px-10 pb-10'>
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Müşteri
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Şirket
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Talep Başlığı
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tahmini Bütçe
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {CUSTOMER_REQUESTS.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{request.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{request.company}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{request.title}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate group-hover:text-[#0051D5] transition-colors">
                      {request.description}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{request.estimatedBudget}</td>
                    <td className="px-6 py-4 text-gray-500">{request.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-2 rounded-full text-xs font-medium ${
                        request.status === 'Onaylandı' ? 'bg-emerald-100 text-emerald-700' :
                        request.status === 'Projeye dönüştür' ? 'w-full h-full border rounded-sm border-blue-500 hover:bg-blue-500 hover:text-white transition-all ' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {selectedRequest && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-gray-100 space-y-6 transform transition-all"
            onClick={(e) => e.stopPropagation()} 
          >
            
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#0051D5] uppercase tracking-wider">
                  Talep Detayı #{selectedRequest.id}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {selectedRequest.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block">Müşteri & Şirket</span>
                <span className="font-semibold text-gray-800 text-xl">
                  {selectedRequest.customerName} ({selectedRequest.company})
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Tahmini Bütçe</span>
                <span className="font-semibold text-[#0051D5] text-xl">
                  {selectedRequest.estimatedBudget}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Tarih</span>
                <span className="font-medium text-gray-700 text-xl">
                  {selectedRequest.date}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Durum</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xl font-medium mt-0.5 ${
                  selectedRequest.status === 'Onaylandı' ? 'bg-emerald-100 text-emerald-700' :
                  selectedRequest.status === 'Projeye dönüştür' ? 'text-center items-center border rounded-sm border-blue-500 hover:bg-blue-500 hover:text-white transition-all' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>

           
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Açıklama</h4>
              <p className="text-gray-600 leading-relaxed text-xl bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                {selectedRequest.description}
              </p>
            </div>

           
            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-all cursor-pointer shadow-sm"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerRequests