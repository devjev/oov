import { createSlice } from '@reduxjs/toolkit'
import { HistoryRecord } from '../../app/api'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [] as HistoryRecord[],
  },
  reducers: {
    initialize: (state, action) => {
      // side-effects handled by Saga middleware
    },
    update: (state, action) => {
      state.value.push(...action.payload)
    },
  },
})

export const { update } = historySlice.actions
export default historySlice.reducer
