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
      state.push(...action.payload)
    },
  },
})

export const { initialize, update } = historySlice.actions

export default historySlice.reducer
