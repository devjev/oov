import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import historyReducer from '../features/history-list/historySlice'
import validationResultReducer from '../features/validation-result-view/validationResultSlice'

export const middleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    history: historyReducer,
    currentValidationResult: validationResultReducer,
  },
  middleware: [middleware],
})
