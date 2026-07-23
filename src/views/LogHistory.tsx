import React, { useState } from 'react'
import { 
  CheckCircle2, 
  XCircle, 
  Repeat, 
  ShoppingCart, 
  Search, 
  Database,
  Briefcase,
  User,
  Package,
  Truck,
  DollarSign,
  Globe
} from 'lucide-react'
import { useAppSelector } from '../store'
import type { LogHistory } from '../store/slices/logSlice'

function LogHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL')


  const logs = useAppSelector((state) => state.logs?.items || [])

  
  const getLogStyle = (actionType: LogHistory['actionType']) => {
    switch (actionType) {
      case 'SATIN_ALMA_ONAY':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          bgColor: 'bg-emerald-50 border-emerald-100',
          badgeColor: 'bg-emerald-100 text-emerald-700'
        }
      case 'SATIN_ALMA_RET':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-600" />,
          bgColor: 'bg-rose-50 border-rose-100',
          badgeColor: 'bg-rose-100 text-rose-700'
        }
      case 'PROJEYE_DONUSTURME':
        return {
          icon: <Repeat className="w-5 h-5 text-amber-600" />,
          bgColor: 'bg-amber-50 border-amber-100',
          badgeColor: 'bg-amber-100 text-amber-700'
        }
      case 'SATIN_ALMA_TALEBI':
        return {
          icon: <ShoppingCart className="w-5 h-5 text-blue-600" />,
          bgColor: 'bg-blue-50 border-blue-100',
          badgeColor: 'bg-blue-100 text-[#0051D5]'
        }
      default:
        return {
          icon: <Database className="w-5 h-5 text-gray-600" />,
          bgColor: 'bg-gray-100 border-gray-200',
          badgeColor: 'bg-gray-100 text-gray-700'
        }
    }
  }


  const filteredLogs = logs.filter((log) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      log.title?.toLowerCase().includes(query) ||
      log.description?.toLowerCase().includes(query) ||
      log.project?.toLowerCase().includes(query) ||
      log.customer?.toLowerCase().includes(query) ||
      log.item?.toLowerCase().includes(query) 
      

    if (selectedFilter === 'ALL') return matchesSearch
    return matchesSearch && log.actionType === selectedFilter
  })

  return (
    <div className="w-full min-h-screen bg-dashboard p-10 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Faaliyet Geçmişi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sistemdeki tüm onay, ret, dönüşüm ve satın alma detaylarının kronolojik kaydı.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Proje, müşteri, ürün, tedarikçi ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#0051D5] shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
        
       
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-800">Son Aktivitelere Bakış</h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { label: 'Tümü', value: 'ALL' },
              { label: 'Onaylananlar', value: 'SATIN_ALMA_ONAY' },
              { label: 'Reddedilenler', value: 'SATIN_ALMA_RET' },
              { label: 'Dönüşümler', value: 'PROJEYE_DONUSTURME' },
              { label: 'Talepler', value: 'SATIN_ALMA_TALEBI' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === tab.value
                    ? 'bg-[#0051D5] text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        
        <div className="space-y-6">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              Eşleşen herhangi bir faaliyet kaydı bulunamadı.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const style = getLogStyle(log.actionType)
              const [datePart, timePart] = log.date ? log.date.split(' ') : ['', '']

              return (
                <div key={log.id} className="flex gap-4 items-start group">
                
                  <div className={`p-3 rounded-full border ${style.bgColor} shrink-0 mt-0.5 shadow-sm`}>
                    {style.icon}
                  </div>

                  
                  <div className="flex-1 border-b border-gray-100 pb-6 group-last:border-none group-last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 text-base">
                          {log.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${style.badgeColor}`}>
                          {log.actionType}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-400 ml-2 whitespace-nowrap">
                        {datePart} {timePart}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {log.description}
                    </p>

      
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-gray-50/80 p-3 rounded-2xl border border-gray-100 text-xs">
                      
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <Briefcase size={11} /> Proje
                        </span>
                        <span className="font-semibold text-gray-700 truncate mt-0.5">
                          {log.project || '-'}
                        </span>
                      </div>

                     
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <User size={11} /> Müşteri
                        </span>
                        <span className="font-semibold text-gray-700 truncate mt-0.5">
                          {log.customer || '-'}
                        </span>
                      </div>

                     
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <Package size={11} /> Ürün/Hizmet
                        </span>
                        <span className="font-semibold text-gray-700 truncate mt-0.5">
                          {log.item || '-'}
                        </span>
                      </div>

                     
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <Truck size={11} /> Tedarikçi
                        </span>
                        <span className="font-semibold text-gray-700 truncate mt-0.5">
                          {log.supplier || '-'}
                        </span>
                      </div>

                     
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <DollarSign size={11} /> Tutar
                        </span>
                        <span className="font-bold text-gray-800 mt-0.5">
                          {log.amount ? `$${log.amount.toLocaleString()}` : '-'}
                        </span>
                      </div>

                      
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <Globe size={11} /> Kaynak
                        </span>
                        <span className="font-semibold text-[#0051D5] truncate mt-0.5">
                          {log.source || 'Sistem'}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default LogHistory