import React, { useState } from 'react'
import { PROJECTS, type Project } from '../utils/placeholderData'
import { Plus, CheckCircle, ShoppingCart } from 'lucide-react'

function Projects() {
  
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS)
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0])

 
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  
  const handleAddNeed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName || !newItemPrice || !selectedProject) return

    const newNeed = {
      id: Date.now(),
      name: newItemName,
      estimatedPrice: Number(newItemPrice),
      status: 'Beklemede'
    }

    const updatedNeeds = [...(selectedProject.needs || []), newNeed]
    const updatedSelectedProject = { ...selectedProject, needs: updatedNeeds }

    setSelectedProject(updatedSelectedProject)
    setProjectsList(prev => prev.map(p => p.id === selectedProject.id ? updatedSelectedProject : p))

    setNewItemName('')
    setNewItemPrice('')
  }

  
  const handleCreatePurchaseRequest = (needId: number) => {
    if (!selectedProject) return

    const updatedNeeds = (selectedProject.needs || []).map(need =>
      need.id === needId ? { ...need, status: 'Satın Alma Talebi Oluşturuldu' } : need
    )
    const updatedSelectedProject = { ...selectedProject, needs: updatedNeeds }

    setSelectedProject(updatedSelectedProject)
    setProjectsList(prev => prev.map(p => p.id === selectedProject.id ? updatedSelectedProject : p))
  }

  const remainingBudget = selectedProject ? selectedProject.budget - selectedProject.spentBudget : 0

  return (
    <div className='w-full h-full min-h-screen bg-dashboard p-10'>
      <div className='text-4xl font-bold text-gray-800 mb-8'>Projeler</div>

     
      <div className='flex flex-col lg:flex-row gap-8 items-start'>

        
        <div className='w-full lg:w-1/4 space-y-4'>
          <h2 className='text-lg font-bold text-gray-700'>Proje Listesi</h2>
          <div className='space-y-3'>
            {projectsList.map((project) => {
              const isSelected = selectedProject?.id === project.id
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#0051D5] shadow-md ring-2 ring-[#0051D5]/10'
                      : 'bg-white/80 border-gray-200 hover:bg-white shadow-sm'
                  }`}
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-bold text-gray-800 text-base leading-snug'>{project.name}</h3>
                  </div>
                  <p className='text-xs text-gray-500 font-medium mb-3'>{project.company || project.customerName}</p>
                  
                  <div className='flex justify-between items-center text-xs pt-2 border-t border-gray-100'>
                    <span className='font-bold text-[#0051D5]'>${project.budget.toLocaleString()}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      project.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-[#0051D5]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

       
        {selectedProject && (
          <div className='w-full lg:w-3/4 space-y-6'>

            
            <div className='bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6'>
              <div className='flex justify-between items-start'>
                <div>
                  <span className='text-xs font-bold text-[#0051D5] uppercase tracking-wider'>{selectedProject.id}</span>
                  <h1 className='text-2xl font-bold text-gray-800 mt-0.5'>{selectedProject.name}</h1>
                  <p className='text-xs text-gray-500 mt-1'>Müşteri: <strong className='text-gray-700'>{selectedProject.customerName} ({selectedProject.company})</strong> | Başlangıç: {selectedProject.startDate}</p>
                </div>
                <span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0051D5] border border-blue-100'>
                  {selectedProject.status}
                </span>
              </div>

            
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2'>
                <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                  <span className='text-xs text-gray-400 font-medium block'>Toplam Bütçe</span>
                  <span className='text-xl font-bold text-gray-800'>${selectedProject.budget.toLocaleString()}</span>
                </div>
                <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                  <span className='text-xs text-gray-400 font-medium block'>Gider (Harcanan)</span>
                  <span className='text-xl font-bold text-amber-600'>${selectedProject.spentBudget.toLocaleString()}</span>
                </div>
                <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100'>
                  <span className='text-xs text-gray-400 font-medium block'>Kalan Bütçe</span>
                  <span className='text-xl font-bold text-emerald-600'>${remainingBudget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            
            <div className='bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3'>
              <h3 className='text-base font-bold text-gray-800'>Yapılacak İşler</h3>
              <ul className='space-y-2'>
                {(selectedProject.tasks || []).map((task, idx) => (
                  <li key={idx} className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                    <CheckCircle size={16} className='text-[#0051D5]' />
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            
            <div className='bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6'>
              <h3 className='text-base font-bold text-gray-800'>Proje İhtiyaçları & Satın Alma</h3>

            
              <form onSubmit={handleAddNeed} className='flex flex-col md:flex-row gap-3 items-end bg-gray-50 p-4 rounded-2xl border border-gray-100'>
                <div className='flex-1 w-full space-y-1'>
                  <label className='text-xs font-semibold text-gray-600'>İhtiyaç Duyulan Ürün / Hizmet</label>
                  <input
                    type='text'
                    placeholder='Örn: Sunucu Lisansı'
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className='w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#0051D5]'
                  />
                </div>
                <div className='w-full md:w-40 space-y-1'>
                  <label className='text-xs font-semibold text-gray-600'>Tahmini Fiyat ($)</label>
                  <input
                    type='number'
                    placeholder='0'
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className='w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#0051D5]'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full md:w-auto px-5 py-2 bg-[#0051D5] hover:bg-[#0041ab] text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                >
                  <Plus size={16} /> İhtiyaç Ekle
                </button>
              </form>

              
              <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-600'>
                  <thead className='bg-gray-50 text-xs uppercase text-gray-400 border-b border-gray-100'>
                    <tr>
                      <th className='px-4 py-3'>Ürün / Hizmet</th>
                      <th className='px-4 py-3'>Tahmini Fiyat</th>
                      <th className='px-4 py-3'>Durum</th>
                      <th className='px-4 py-3 text-right'>İşlem</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-100'>
                    {(!selectedProject.needs || selectedProject.needs.length === 0) ? (
                      <tr>
                        <td colSpan={4} className='text-center py-4 text-gray-400 text-xs'>
                          Henüz bu projeye ait bir ihtiyaç eklenmedi.
                        </td>
                      </tr>
                    ) : (
                      selectedProject.needs.map((need) => (
                        <tr key={need.id}>
                          <td className='px-4 py-3 font-medium text-gray-800'>{need.name}</td>
                          <td className='px-4 py-3 font-semibold text-gray-700'>${need.estimatedPrice.toLocaleString()}</td>
                          <td className='px-4 py-3'>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              need.status === 'Satın Alma Talebi Oluşturuldu'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {need.status}
                            </span>
                          </td>
                          <td className='px-4 py-3 text-right'>
                            {need.status === 'Beklemede' && (
                              <button
                                onClick={() => handleCreatePurchaseRequest(need.id)}
                                className='px-3 py-1.5 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all flex items-center gap-1 ml-auto cursor-pointer'
                              >
                                <ShoppingCart size={12} /> Satın Alma Talebi Yap
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Projects