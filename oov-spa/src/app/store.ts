import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import historyReducer from '../features/history-list/historySlice'
import validationResultReducer from '../features/validation-result-view/validationResultSlice'
import commandBarReducer from '../features/command-bar/commandBarSlice'

export const middleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    history: historyReducer,
    currentValidationResult: validationResultReducer,
    commandBar: commandBarReducer,
  },
  middleware: [middleware],
})
