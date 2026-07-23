import { createSlice } from '@reduxjs/toolkit'
import { FINANCE_DATA } from '../../utils/placeholderData'
import type { FinanceRecord, FinanceState } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: FinanceState = {
  items: (FINANCE_DATA as FinanceRecord[]) || [],
}

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addFinanceRecord: (state, action: PayloadAction<FinanceRecord>) => {
      state.items.unshift(action.payload)
    },
    removeFinanceRecord: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setFinanceRecords: (state, action: PayloadAction<FinanceRecord[]>) => {
      state.items = action.payload
    },
  },
})

export const { addFinanceRecord, removeFinanceRecord, setFinanceRecords } = financeSlice.actions
export default financeSlice.reducer