import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex min-h-screen w-full bg-white  font-sans">
      
     
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tasks' && <div className="text-2xl font-bold">Görevler Modülü Çok Yakında...</div>}
        {activeTab === 'settings' && <div className="text-2xl font-bold">Ayarlar Modülü Çok Yakında...</div>}
      </main>

    </div>
  )
}

export default App