import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import {
  persistStore,
  persistReducer,
} from 'redux-persist'


import customerRequestsReducer from './slices/customerRequestsSlice'
import projectsReducer from './slices/projectsSlice'
import purchasesReducer from './slices/purchasesSlice'
import financeReducer from './slices/financeSlice'
import logsReducer from './slices/logSlice'


const storage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key))
  },

  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },

  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}



const persistConfig = {

  key: 'root',

  storage,

  whitelist: [
    'customerRequests',
    'projects',
    'purchases',
    'finance',
    'logs',
  ],

}



const rootReducer = combineReducers({

  customerRequests: customerRequestsReducer,

  projects: projectsReducer,

  purchases: purchasesReducer,

  finance: financeReducer,

  logs: logsReducer,

})



const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
)



export const store = configureStore({

  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})



export const persistor = persistStore(store)



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector