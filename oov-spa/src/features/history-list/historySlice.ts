import { createSlice } from '@reduxjs/toolkit'
import { HistoryRecord } from '../../app/api'

export const historySlice = createSlice({
  name: 'history',
  initialState: [] as HistoryRecord[],
  reducers: {
    initialize: (state, action) => {
      // side-effects handled by Saga middleware
    },
    update: (state, action) => {
      for (const validationResult of action.payload) {
        state.unshift(validationResult)
      }
      return state
    },
    prepend: (state, action) => {
      state.unshift(action.payload)
      return state
    },
  },
})

export const { initialize, update, prepend } = historySlice.actions

export default historySlice.reducer
