import { createSlice } from '@reduxjs/toolkit'
import { HistoryRecord } from '../../app/api'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [] as HistoryRecord[],
  },
  reducers: {
    update: (state, action) => {
      // Just dumb
      state.value.push(...action.payload)
    },
    failed: (state) => {
      // Just dumb
      console.log(state)
    },
  },
})

export const { update, failed } = historySlice.actions
export default historySlice.reducer
