import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LogHistory {
  id: string
  actionType: 
    | 'SATIN_ALMA_TALEBI' 
    | 'PROJEYE_DONUSTURME' 
    | 'SATIN_ALMA_ONAY' 
    | 'SATIN_ALMA_RET' 
    | 'GIDER_KAYDI'
  title: string
  description: string
  project: string         
  customer: string        
  item: string            
 
  amount: number          
  date: string            
  source: string          
}

interface ActivityState {
  items: LogHistory[]
}

const initialState: ActivityState = {
  items: [
    {
      id: 'LOG-1001',
      actionType: 'SATIN_ALMA_ONAY',
      title: 'Satın Alma Onaylandı',
      description: 'AWS Bulut Sunucu Lisansı satın alma talebi onaylandı ve proje giderine işlendi.',
      project: 'E-Ticaret Altyapı Yenileme',
      customer: 'TechCorp A.Ş.',
      item: 'AWS Bulut Sunucu Lisansı',
      
      amount: 1200,
      date: '2026-07-22 14:30',
      source: 'Satın Alma Ekranı',
    },
  ],
}

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<LogHistory>) => {
      state.items.unshift(action.payload)
    },
  },
})

export const { addLog } = activitySlice.actions
export default activitySlice.reducer