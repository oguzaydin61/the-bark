import React, { useState } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { updatePurchaseStatus, updatePurchaseInput } from '../store/slices/purchasesSlice'
import { addProjectExpense } from '../store/slices/projectsSlice'
import { addLog } from '../store/slices/logSlice'
import { addFinanceRecord } from '../store/slices/financeSlice'


function Purchases() {
  const dispatch = useAppDispatch()
  
  
  const purchases = useAppSelector((state) => state.purchases?.items || [])
  const pendingPurchases = purchases.filter((p) => p.status === 'Pending')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  
  const handleInputChange = (id: string, field: 'supplier' | 'actualPrice', value: string) => {
    dispatch(updatePurchaseInput({ id, field, value }))
    if (errorMessage) setErrorMessage(null)
  }

  
  const handleApprove = (item: PurchaseRequest) => {
    if (!item.supplier || !item.supplier.trim() || !item.actualPrice || Number(item.actualPrice) <= 0) {
      setErrorMessage(`${item.id} kodlu talep için lütfen geçerli bir Tedarikçi ve Tutar girin!`)
      return
    }

    const approvedAmount = Number(item.actualPrice)

   
dispatch(
  updatePurchaseStatus({
    id: item.id,
    status: 'Approved'
  })
)



dispatch(
  addFinanceRecord({

    id: crypto.randomUUID(),

    projectName: item.projectName,

    customerName: item.customerName,

    item: item.item,

    supplier: item.supplier,

    purchaseRequestId: item.id,

    date: new Date().toISOString(),

    amount: approvedAmount,

    type: 'EXPENSE'

  })
)



if (item.projectId) {

  dispatch(
    addProjectExpense({
      projectId: item.projectId,
      amount: approvedAmount
    })
  )

}



dispatch(
  addLog({

    id: Date.now(),

    title: `Satın Alma Onaylandı: ${item.item}`,

    description:
    `${item.projectName} projesi için ${item.supplier} tedarikçisinden ${approvedAmount}$ tutarında satın alma onaylandı.`,

    type: 'APPROVE_PURCHASE',

    date: 'Şimdi',

  })
)
    setErrorMessage(null)
  }

 
  const handleReject = (item: PurchaseRequest) => {

    dispatch(updatePurchaseStatus({ id: item.id, status: 'Rejected' }))


    dispatch(
      addLog({
        id: Date.now(),
        title: `Satın Alma Reddedildi: ${item.item}`,
        description: `${item.projectName} projesi için yapılan satın alma talebi reddedildi.`,
        type: 'REJECT_PURCHASE',
        date: 'Şimdi',
      })
    )

    setErrorMessage(null)
  }

  return (
    <div className="w-full h-full min-h-screen bg-dashboard p-10">
      <div className="text-4xl font-bold text-gray-800 mb-8">Satın Alma Talepleri</div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Talep No / Proje</th>
                <th className="px-6 py-4">Ürün / Hizmet</th>
                <th className="px-6 py-4">Tahmini Fiyat</th>
                <th className="px-6 py-4">Tedarikçi</th>
                <th className="px-6 py-4">Gerçekleşen Tutar ($)</th>
                <th className="px-6 py-4 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                    Bekleyen satın alma talebi bulunmuyor.
                  </td>
                </tr>
              ) : (
                pendingPurchases.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-[#0051D5] block">{item.id}</span>
                      <span className="font-bold text-gray-800 text-sm">{item.projectName}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{item.item}</td>
                    <td className="px-6 py-4 font-semibold text-gray-500">
                      ${(item.estimatedPrice || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Tedarikçi Giriniz"
                        value={item.supplier || ''}
                        onChange={(e) => handleInputChange(item.id, 'supplier', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0051D5] bg-gray-50"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.actualPrice || ''}
                        onChange={(e) => handleInputChange(item.id, 'actualPrice', e.target.value)}
                        className="w-32 px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0051D5] bg-gray-50 font-semibold text-gray-800"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleApprove(item)}
                          title="Onayla ve Gider Yaz"
                          className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleReject(item)}
                          title="Reddet"
                          className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <X size={16} />
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