import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Project, ProjectNeed,ProjectsState } from '../../types'


const initialState: ProjectsState = {
  items: [
    {
      id: 'PRJ-101',
      name: 'Beta Ofis Genişletme & API',
      customerName: 'Elena Popescu',
      company: 'Popescu Logistics',
      budget: 30000,
      spentBudget: 0,
      startDate: '2026-01-15',
      status: 'Devam Ediyor',
      tasks: ['Veritabanı taşınması', 'UI tasarımlarının onaylanması'],
      needs: [
        {
          id: 1,
          name: 'AWS Bulut Sunucu Lisansı',
          estimatedPrice: 1200,
          status: 'Beklemede',
        },
      ],
    },
  ],
}


const sanitizeProject = (payload: any): Project => {
  return {
    id: payload.id || `PRJ-${Date.now().toString().slice(-4)}`,
    name: payload.name || payload.title || 'İsimsiz Proje',
    customerName: payload.customerName || payload.client || payload.customer || 'Bilinmeyen Müşteri',
    company: payload.company || payload.companyName || 'Şirket Belirtilmedi',
    budget: Number(payload.budget || payload.estimatedBudget || payload.price || 0),
    spentBudget: Number(payload.spentBudget || 0),
    startDate: payload.startDate || new Date().toISOString().split('T')[0],
    status: payload.status || 'Devam Ediyor',
    tasks: Array.isArray(payload.tasks) ? payload.tasks : [],
    needs: Array.isArray(payload.needs) ? payload.needs : [],
  }
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Partial<Project>>) => {
      state.items.unshift(sanitizeProject(action.payload))
    },
    addProjectFromRequest: (state, action: PayloadAction<any>) => {
      state.items.unshift(sanitizeProject(action.payload))
    },
    addNeedToProject: (
      state,
      action: PayloadAction<{ projectId: string; need: ProjectNeed }>
    ) => {
      const project = state.items.find((p) => p.id === action.payload.projectId)
      if (project) {
        if (!project.needs) project.needs = []
        project.needs.push(action.payload.need)
      }
    },
    updateNeedStatus: (
      state,
      action: PayloadAction<{
        projectId: string
        needId: number
        status: 'Beklemede' | 'Satın Alma Talebi Oluşturuldu'
      }>
    ) => {
      const project = state.items.find((p) => p.id === action.payload.projectId)
      if (project) {
        const need = project.needs?.find((n) => n.id === action.payload.needId)
        if (need) {
          need.status = action.payload.status
        }
      }
    },
    addProjectExpense: (
      state,
      action: PayloadAction<{ projectId: string; amount: number }>
    ) => {
      const project = state.items.find((p) => p.id === action.payload.projectId)
      if (project) {
        project.spentBudget = (project.spentBudget || 0) + action.payload.amount
      }
    },
  },
})

export const {
  addProject,
  addProjectFromRequest,
  addNeedToProject,
  updateNeedStatus,
  addProjectExpense,
} = projectsSlice.actions

export default projectsSlice.reducer