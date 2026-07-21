import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import './App.css'
import CustomerRequests from './views/CustomerRequests'
import Projects from './views/Projects'
import Purchases from './views/Purchase'
import Finance from './views/Finance'
import LogHistory from './views/LogHistory'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex min-h-screen w-full bg-white  font-sans">
      
     
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tasks' && <CustomerRequests/>}
        {activeTab === 'projects' && <Projects/>}
         {activeTab === 'purchase' && <Purchases/>}
         {activeTab === 'finance' && <Finance/>}
         {activeTab === 'faaliyet' && <LogHistory/>}

      </main>

    </div>
  )
}

export default App