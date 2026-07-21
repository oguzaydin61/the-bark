import React, { useState } from 'react'
import { PURCHASES_DATA, type PurchaseRequest } from '../utils/placeholderData'
import { Check, X, Filter, Plus, AlertCircle } from 'lucide-react'

function Purchases() {
  const [purchases, setPurchases] = useState<PurchaseRequest[]>(PURCHASES_DATA)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  
  const handleInputChange = (id: string, field: 'supplier' | 'actualPrice', value: string) => {
    setPurchases(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    )
    if (errorMessage) setErrorMessage(null)
  }

  
  const handleApprove = (item: PurchaseRequest) => {
    
    if (!item.supplier.trim() || !item.actualPrice || Number(item.actualPrice) <= 0) {
      setErrorMessage(`${item.id} kodlu talep için lütfen geçerli bir Tedarikçi ve Tutar girin!`)
      return
    }

    setPurchases(prev =>
      prev.map(p => (p.id === item.id ? { ...p, status: 'Approved' } : p))
    )
    setErrorMessage(null)
    
  }

 
  const handleReject = (id: string) => {
    setPurchases(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Rejected' } : p))
    )
    setErrorMessage(null)
  }

  
  const pendingPurchases = purchases.filter(p => p.status === 'Pending')

  return (
    <div className="w-full h-full min-h-screen bg-dashboard p-10">
      
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Satın Alma Talepleri</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Bekleyen satın alma onaylarını yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 shadow-sm transition-all cursor-pointer">
            <Filter size={16} />
            Filtrele
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-xl shadow-sm transition-all cursor-pointer">
            <Plus size={16} />
            Yeni Talep
          </button>
        </div>
      </div>

     
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Bekleyen Onaylar</h2>
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
            {pendingPurchases.length} Bekleyen
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Talep ID</th>
                <th className="px-4 py-3.5">Proje</th>
                <th className="px-4 py-3.5">Kalem</th>
                <th className="px-4 py-3.5">Tedarikçi (Giriş)</th>
                <th className="px-4 py-3.5">Tutar (Giriş)</th>
                <th className="px-4 py-3.5 text-center">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400 font-medium">
                    Bekleyen satın alma talebi bulunmuyor.
                  </td>
                </tr>
              ) : (
                pendingPurchases.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {item.id}
                    </td>

                   
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-gray-700">{item.projectName}</span>
                      </div>
                    </td>

                    
                    <td className="px-4 py-4 font-medium text-gray-600">
                      {item.item}
                    </td>

                  
                    <td className="px-4 py-4">
                      <input
                        type="text"
                        placeholder="Tedarikçi Adı"
                        value={item.supplier}
                        onChange={(e) => handleInputChange(item.id, 'supplier', e.target.value)}
                        className="w-full max-w-[180px] px-3 py-1.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0051D5] transition-all bg-gray-50/30 focus:bg-white"
                      />
                    </td>

                    
                    <td className="px-4 py-4">
                      <div className="relative max-w-[130px]">
                        <input
                          type="number"
                          placeholder="Tutar"
                          value={item.actualPrice}
                          onChange={(e) => handleInputChange(item.id, 'actualPrice', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0051D5] transition-all bg-gray-50/30 focus:bg-white"
                        />
                      </div>
                    </td>

                   
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        
                        <button
                          onClick={() => handleReject(item.id)}
                          title="Reddet"
                          className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <X size={16} />
                        </button>

                     
                        <button
                          onClick={() => handleApprove(item)}
                          title="Onayla"
                          className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <Check size={16} />
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

    </div>
  )
}

export default Purchases