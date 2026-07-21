import React, { useState } from 'react'
import { ACTIVITY_LOGS, type ActivityLog } from '../utils/placeholderData'
import { 
  CheckCircle2, 
  XCircle, 
  Repeat, 
  ShoppingCart, 
  Search, 
  User, 
  Database 
} from 'lucide-react'

function LogHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL')

  const getLogStyle = (type: ActivityLog['type']) => {
    switch (type) {
      case 'APPROVE_PURCHASE':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          bgColor: 'bg-emerald-50 border-emerald-100',
          badgeColor: 'bg-emerald-100 text-emerald-700'
        }
      case 'REJECT_PURCHASE':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-600" />,
          bgColor: 'bg-rose-50 border-rose-100',
          badgeColor: 'bg-rose-100 text-rose-700'
        }
      case 'CONVERT_PROJECT':
        return {
          icon: <Repeat className="w-5 h-5 text-amber-600" />,
          bgColor: 'bg-amber-50 border-amber-100',
          badgeColor: 'bg-amber-100 text-amber-700'
        }
      case 'CREATE_PURCHASE':
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


  const filteredLogs = ACTIVITY_LOGS.filter((log) => {
    const matchesSearch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === 'ALL') return matchesSearch
    return matchesSearch && log.type === selectedFilter
  })

  return (
    <div className="w-full min-h-screen bg-dashboard p-10 space-y-8">
    
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Faaliyet Geçmişi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sistemdeki tüm onay, ret ve dönüşüm işlemlerinin kronolojik kaydı.
          </p>
        </div>

        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Loglarda ara..."
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
              { label: 'Onaylananlar', value: 'APPROVE_PURCHASE' },
              { label: 'Reddedilenler', value: 'REJECT_PURCHASE' },
              { label: 'Dönüşümler', value: 'CONVERT_PROJECT' },
              { label: 'Talepler', value: 'CREATE_PURCHASE' },
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
              const style = getLogStyle(log.type)
              const [datePart, timePart] = log.date.split(' ')

              return (
                <div key={log.id} className="flex gap-4 items-start group">
                  
                  
                  <div className={`p-3 rounded-full border ${style.bgColor} shrink-0 mt-0.5 shadow-sm`}>
                    {style.icon}
                  </div>

                  
                  <div className="flex-1 border-b border-gray-100 pb-6 group-last:border-none group-last:pb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 text-base">
                        {log.title}
                      </h3>
                      <span className="text-xs font-semibold text-gray-400 ml-2 whitespace-nowrap">
                        {timePart || datePart}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {log.description}
                    </p>

                   
                    {log.type === 'REJECT_PURCHASE' && (
                      <div className="mt-3 p-3.5 bg-gray-50 rounded-2xl border-l-4 border-l-rose-500 border border-gray-100 text-xs text-gray-600 italic">
                        "Belirtilen bütçe kalemi bu çeyrek için ayrılan maksimum limiti aştığından işlem onaylanmamıştır."
                      </div>
                    )}

                   
                    {log.type === 'CONVERT_PROJECT' && (
                      <div className="mt-3">
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-100 inline-block">
                          Durum Değişikliği
                        </span>
                      </div>
                    )}

                    
                    <div className="flex items-center gap-2 mt-3 pt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                        <User size={12} />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        Sistem Yöneticisi / Admin
                      </span>
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