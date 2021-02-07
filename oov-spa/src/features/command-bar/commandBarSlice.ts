import { createSlice } from '@reduxjs/toolkit'
import { AppConfig } from '../../app/api'

export const commandBarSlice = createSlice({
  name: 'commands',
  initialState: {
    view: 'new' as 'new' | 'view',
    config: {
      theme: 'light' as 'light' | 'dark',
    },
  } as AppConfig,
  reducers: {
    initialize: (state, action) => {
      // side-effects handled by Saga middleware
    },
    update: (state, action) => {
      return action.payload
    },
  },
})

export const { initialize, update } = commandBarSlice.actions

export default commandBarSlice.reducer
