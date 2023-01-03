import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import newsReducer from './reducers/news'

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>

export const AppDispatch = store.dispatch
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector
export default store