import { X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { setSelectedRequest, convertToProject } from '../store/slices/customerRequestsSlice'
import { addProjectFromRequest } from '../store/slices/projectsSlice'
import { addLog } from '../store/slices/logSlice'

function CustomerRequests() {
  const dispatch = useAppDispatch()

  const customerRequests = useAppSelector((state) => state.customerRequests.items)
  const selectedRequest = useAppSelector((state) => state.customerRequests.selectedRequest)

  const handleConvertToProject = (request: typeof selectedRequest) => {
    if (!request || request.status === 'Converted') return

    dispatch(convertToProject(request.id))
    
    dispatch(
      addProjectFromRequest({
        name: request.title,
        client: request.customerName,
        budget: request.estimatedBudget,
        company : request.company
      })
    )

    dispatch(
      addLog({
        id: `LOG-${Date.now()}`,
        actionType: 'PROJEYE_DONUSTURME',
        title: `Talep Projeye Dönüştürüldü: ${request.title}`,
        description: `${request.customerName} müşterisinin talebi 'Converted' statüsü ile projelere aktarıldı.`,
        project: request.title,
        customer: request.customerName,
        item: 'Proje Hizmeti',
        amount: Number(request.estimatedBudget) || 0,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        source: 'Müşteri Talepleri',
      })
    )
  }

  return (
    <div className="w-full h-full min-h-screen bg-dashboard relative">
      <div className="w-full h-full">
        <div className="text-4xl px-10 py-10 font-bold text-gray-800">Müşteri Talepleri</div>

        <div className="px-10 pb-10">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Müşteri</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Şirket</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Talep Başlığı</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Açıklama</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahmini Bütçe</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {customerRequests.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => dispatch(setSelectedRequest(request))}
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
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          request.status === 'Converted'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : request.status === 'Converted'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
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
          onClick={() => dispatch(setSelectedRequest(null))}
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
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{selectedRequest.title}</h3>
              </div>
              <button
                onClick={() => dispatch(setSelectedRequest(null))}
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
                <span className="font-semibold text-[#0051D5] text-xl">{selectedRequest.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Tarih</span>
                <span className="font-medium text-gray-700 text-xl">{selectedRequest.date}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Durum</span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                    selectedRequest.status === 'Converted'
                      ? 'bg-blue-100 text-blue-700'
                      : selectedRequest.status === 'Converted'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Açıklama</h4>
              <p className="text-gray-600 leading-relaxed text-lg bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                {selectedRequest.description}
              </p>
            </div>

            
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => dispatch(setSelectedRequest(null))}
                className="px-5 py-2.5 bg-gray-100 text-gray-600 font-medium text-sm rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
              >
                Vazgeç / Kapat
              </button>

              <button
                disabled={selectedRequest.status === 'Converted'}
                onClick={() => handleConvertToProject(selectedRequest)}
                className={`px-6 py-2.5 font-semibold text-sm rounded-xl transition-all shadow-sm ${
                  selectedRequest.status === 'Converted'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0051D5] text-white hover:bg-blue-700 cursor-pointer'
                }`}
              >
                {selectedRequest.status === 'Converted' ? 'Zaten Projeye Dönüştürüldü' : 'Projeye Dönüştür'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerRequests