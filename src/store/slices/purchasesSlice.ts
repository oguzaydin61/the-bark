import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PURCHASES_DATA } from '../../utils/placeholderData'
import type { PurchaseRequest } from '../../types'


type AddPurchaseRequestPayload = {
  projectId: string
  projectName: string
  item: string
  estimatedPrice: number
}

type UpdatePurchaseInputPayload = {
  id: string
  field: 'supplier' | 'actualPrice'
  value: string
}

type UpdatePurchaseStatusPayload = {
  id: string
  status: 'Approved' | 'Rejected'
}

interface PurchasesState {
  items: PurchaseRequest[]
}

const initialState: PurchasesState = {
  items: PURCHASES_DATA || [],
}

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchaseRequest: (state, action: PayloadAction<AddPurchaseRequestPayload>) => {
      const { projectId, projectName, item, estimatedPrice } = action.payload

      const newPurchase: PurchaseRequest = {
        id: `PR-${Date.now().toString().slice(-4)}`,
        projectId,
        projectName,
        item,
        estimatedPrice,
        supplier: '',
        actualPrice: '',
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      }

      state.items.unshift(newPurchase)
    },
    updatePurchaseInput: (state, action: PayloadAction<UpdatePurchaseInputPayload>) => {
      const { id, field, value } = action.payload
      const purchase = state.items.find((p) => p.id === id)
      if (purchase) {
        purchase[field] = value
      }
    },
    updatePurchaseStatus: (state, action: PayloadAction<UpdatePurchaseStatusPayload>) => {
      const { id, status } = action.payload
      const purchase = state.items.find((p) => p.id === id)
      if (purchase) {
        purchase.status = status
      }
    },
  },
})

export const { addPurchaseRequest, updatePurchaseInput, updatePurchaseStatus } =
  purchasesSlice.actions

export default purchasesSlice.reducer