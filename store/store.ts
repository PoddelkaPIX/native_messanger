import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { userQuery } from './slices/common/userSlice/userQuery'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userQuery.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch