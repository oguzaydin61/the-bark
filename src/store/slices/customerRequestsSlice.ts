import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CUSTOMER_REQUESTS } from '../../utils/placeholderData'
import type { CustomerRequest } from '../../types'


type SetSelectedRequestPayload = CustomerRequest | null
type ConvertToProjectPayload = string

interface CustomerRequestsState {
  items: CustomerRequest[]
  selectedRequest: CustomerRequest | null
}

const initialState: CustomerRequestsState = {
  items: CUSTOMER_REQUESTS || [],
  selectedRequest: null,
}

export const customerRequestsSlice = createSlice({
  name: 'customerRequests',
  initialState,
  reducers: {
    setSelectedRequest: (state, action: PayloadAction<SetSelectedRequestPayload>) => {
      state.selectedRequest = action.payload
    },
    convertToProject: (state, action: PayloadAction<ConvertToProjectPayload>) => {
      const requestId = action.payload
      const request = state.items.find((r) => r.id === requestId)
      if (request) {
        request.status = 'Converted'
      }
      if (state.selectedRequest && state.selectedRequest.id === requestId) {
        state.selectedRequest.status = 'Converted'
      }
    },
  },
})

export const { setSelectedRequest, convertToProject } = customerRequestsSlice.actions
export default customerRequestsSlice.reducer