import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import historyReducer from '../features/history-list/historySlice'

export const middleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    history: historyReducer,
  },
  middleware: [middleware],
})
