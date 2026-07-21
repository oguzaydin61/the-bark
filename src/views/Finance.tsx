import { FINANCE_DATA } from '../utils/placeholderData'
import { DollarSign, PieChart, Receipt, ArrowUpRight } from 'lucide-react'

function Finance() {
  const records = FINANCE_DATA

  const totalExpense = records.reduce((acc, curr) => acc + curr.amount, 0)

  const projectExpenses = records.reduce<{ [key: string]: number }>((acc, curr) => {
    acc[curr.projectName] = (acc[curr.projectName] || 0) + curr.amount
    return acc
  }, {})

  return (
    <div className="w-full h-full min-h-screen bg-dashboard p-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Finans Yönetimi</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          Onaylanan satın almalardan oluşan tüm gider kayıtları ve bütçe harcamaları.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Toplam Harcanan Gider
            </span>
            <span className="text-3xl font-bold text-gray-900">
              ${totalExpense.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Onaylanan Gider Kaydı
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {records.length} Kalem
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-[#0051D5] rounded-2xl flex items-center justify-center">
            <Receipt size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Aktif Harcayan Proje
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {Object.keys(projectExpenses).length} Proje
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <PieChart size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">
            Proje Bazlı Giderler
          </h2>
          <div className="space-y-3">
            {Object.entries(projectExpenses).map(([projectName, amount]) => (
              <div key={projectName} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-xs font-semibold text-gray-500 block truncate">
                  {projectName}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">
                    ${amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    Gider
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Gider Kayıtları (Finans Hareketleri)
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              Kaynak: Satın Alma Onayları
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3.5">Finans Kodu</th>
                  <th className="px-4 py-3.5">Proje & Müşteri</th>
                  <th className="px-4 py-3.5">Ürün / Hizmet</th>
                  <th className="px-4 py-3.5">Tedarikçi</th>
                  <th className="px-4 py-3.5">Kaynak Talep</th>
                  <th className="px-4 py-3.5">Tarih</th>
                  <th className="px-4 py-3.5 text-right">Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {item.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-800">{item.projectName}</div>
                      <div className="text-xs text-gray-400">{item.customerName}</div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-700">
                      {item.item}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-lg">
                        {item.supplier}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0051D5] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        {item.purchaseRequestId}
                        <ArrowUpRight size={12} />
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-bold text-rose-600 text-base">
                        -${item.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finance