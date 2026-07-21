import { UsersRound, BriefcaseBusiness, MonitorCheck, MonitorDot } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

function Dashboard() {
  const toplamButce = 420000
  const toplamGider = 97000

  const kalanButce = toplamButce - toplamGider
  const harcamaYuzdesi = Math.round((toplamGider / toplamButce) * 100)

  const chartData = [
    { name: 'Kalan Bütçe', value: kalanButce, color: '#0051D5' },
    { name: 'Harcanan Gider', value: toplamGider, color: '#DBE1FF' }
  ]

  return (
    <div className='w-full h-full min-h-screen bg-dashboard'>
      <div className='text-4xl px-10 py-10 font-bold text-gray-800'>
        Dashboard
      </div>

      <div className='flex items-center justify-between xl:px-10 gap-10'>
        <div className='xl:w-1/4 w-full bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all h-full min-h-52 border p-5 border-gray-300 shadow-gray-300 rounded-3xl'>
          <div className='flex items-start justify-between'>
            <div className='w-16 flex items-center justify-center h-16 rounded-2xl bg-[#DBE1FF]'>
              <UsersRound size={24} className="text-[#0051D5]" />
            </div>
          </div>
          <div className='text-xl items-center py-2 text-gray-600'>
            Toplam müşteri talebi
          </div>
          <div className='text-2xl font-bold py-2 text-gray-800'>
            5
          </div>
        </div>

        <div className='xl:w-1/4 w-full bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all h-full min-h-52 border p-5 border-gray-300 shadow-gray-300 rounded-3xl'>
          <div className='flex items-start justify-between'>
            <div className='w-16 flex items-center justify-center h-16 rounded-2xl bg-[#DBE1FF]'>
              <BriefcaseBusiness className="text-[#0051D5]" />
            </div>
          </div>
          <div className='text-xl items-center py-2 text-gray-600'>
            Aktif Projeler
          </div>
          <div className='text-2xl font-bold py-2 text-gray-800'>
            5
          </div>
        </div>

        <div className='xl:w-1/4 w-full bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all h-full min-h-52 border p-5 border-gray-300 shadow-gray-300 rounded-3xl'>
          <div className='flex items-start justify-between'>
            <div className='w-16 flex items-center justify-center h-16 rounded-2xl bg-[#DBE1FF]'>
              <MonitorCheck className="text-[#0051D5]" />
            </div>
          </div>
          <div className='text-xl items-center py-2 text-gray-600'>
            Onaylanan satın alma
          </div>
          <div className='text-2xl font-bold py-2 text-gray-800'>
            5
          </div>
        </div>

        <div className='xl:w-1/4 w-full bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all h-full min-h-52 border p-5 border-gray-300 shadow-gray-300 rounded-3xl'>
          <div className='flex items-start justify-between'>
            <div className='w-16 flex items-center justify-center h-16 rounded-2xl bg-[#DBE1FF]'>
              <MonitorDot className="text-[#0051D5]" />
            </div>
          </div>
          <div className='text-xl items-center py-2 text-gray-600'>
            Bekleyen satın alma
          </div>
          <div className='text-2xl font-bold py-2 text-gray-800'>
            5
          </div>
        </div>
      </div>

      <div className='flex items-stretch justify-between xl:px-10 gap-10 py-10'>
        <div className='w-2/3 bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all h-full min-h-52 border p-5 border-gray-300 shadow-gray-300 rounded-3xl'>
          <div className='text-3xl text-start justify-center w-full p-5 font-semibold text-gray-800'>
            Finans Durumu
          </div>

          <hr className='text-gray-300' />

          <div className='p-5 flex items-center justify-between'>
            <div className='py-4'>
              <div className='text-xl text-gray-500'>Toplam Proje Bütçesi</div>
              <div className='text-3xl font-bold text-gray-800 mt-1'>
                ${toplamButce.toLocaleString('en-US')}
              </div>
            </div>
            <div className='py-4'>
              <div className='text-xl text-gray-500'>Harcanan Gider</div>
              <div className='text-3xl font-bold text-[#0051D5] opacity-80 mt-1'>
                ${toplamGider.toLocaleString('en-US')}
              </div>
            </div>
            <div className='py-4'>
              <div className='text-xl text-gray-500'>Kalan Bütçe</div>
              <div className='text-3xl font-bold text-[#0051D5] mt-1'>
                ${kalanButce.toLocaleString('en-US')}
              </div>
            </div>
          </div>

          <div className='p-5 flex items-center justify-center gap-10'>
            <div className='relative w-64 h-64 flex items-center justify-center'>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString('en-US')}`, 'Miktar']}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                <span className='text-3xl font-bold text-[#0051D5]'>%{harcamaYuzdesi}</span>
                <span className='text-xs text-gray-500 mt-0.5 font-medium'>Harcandı</span>
              </div>
            </div>

            <div className='space-y-4 text-left'>
              <div className='flex items-center gap-3'>
                <span className='w-3.5 h-3.5 rounded-full bg-[#0051D5]'></span>
                <span className='text-gray-600 font-medium'>Kullanılabilir Bütçe</span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='w-3.5 h-3.5 rounded-full bg-[#DBE1FF]'></span>
                <span className='text-gray-600 font-medium'>Harcanan Gider</span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-1/3 bg-white shadow-sm hover:cursor-pointer hover:border-blue-300 transition-all border p-5 border-gray-300 shadow-gray-300 rounded-3xl flex flex-col justify-between'>
          <div>
            <div className='text-2xl font-semibold text-gray-800 p-2'>
              Son İşlemler
            </div>
            <hr className='text-gray-300 my-2' />

            <div className='space-y-4 p-2 overflow-y-auto max-h-80'>
              <div className='text-sm border-b border-gray-100 pb-2'>
                <p className='font-medium text-gray-800'>Sunucu ödemesi yapıldı</p>
                <span className='text-xs text-gray-400'>10 dk önce • $1.200</span>
              </div>
              <div className='text-sm border-b border-gray-100 pb-2'>
                <p className='font-medium text-gray-800'>Yeni müşteri talebi</p>
                <span className='text-xs text-gray-400'>1 saat önce</span>
              </div>
              <div className='text-sm border-b border-gray-100 pb-2'>
                <p className='font-medium text-gray-800'>Proje bütçesi güncellendi</p>
                <span className='text-xs text-gray-400'>3 saat önce</span>
              </div>
            </div>
          </div>

          <div className='p-2 pt-4 border-t border-gray-100 text-center'>
            <button className='text-sm font-semibold text-[#0051D5] hover:underline cursor-pointer'>
              Tüm Logları Gör →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard