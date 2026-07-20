import React from 'react'
import { LayoutDashboard } from 'lucide-react';

// TypeScript'e bu komponentin dışarıdan hangi verileri (props) alacağını söylüyoruz
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-[#DEDDE1] flex flex-col justify-between p-4 shrink-0">
      <div>
       
        <div className="text-xl font-bold tracking-wider text-black text-center justify-center mb-8 px-2">
          THE-BARK
        </div>
        <div className='w-full h-0.5 bg-[#DEDDE1] '>

        </div>

        
        <nav className="space-y-2 pt-4 ">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-button text-black shadow-lg shadow-button-900/30'
                : 'text-gray-400 hover:bg-button hover:text-black'
            }`}
          >
            <div className='flex gap-2 text-center justify-start '>
                <LayoutDashboard/>
                <div>Dashboard</div>

            </div>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-button text-black shadow-lg shadow-button-900/30'
                : 'text-gray-400 hover:bg-button hover:text-black'
            }`}
          >
            ✅ Görevler
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'settings'
                 ? 'bg-button text-black shadow-lg shadow-button-900/30'
                : 'text-gray-400 hover:bg-button hover:text-black'
            }`}
          >
            ⚙️ Ayarlar
          </button>
        </nav>
      </div>

      {/* Alt Kısım Kullanıcı Profili */}
      <div className="border-t border-button pt-4 text-sm text-gray-500 px-2">
        Giriş Yapıldı
      </div>
    </aside>
  )
}

export default Sidebar