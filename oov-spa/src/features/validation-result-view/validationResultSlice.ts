import { createSlice } from '@reduxjs/toolkit'
import { ValidationResult } from '../../app/api'

export const validationResultSlice = createSlice({
  name: 'currentValidationResult',
  initialState: null as ValidationResult | null,
  reducers: {
    fetch: (state, action) => {},
    fetchSuccess: (state, action) => {
      return { ...action.payload }
    },
    fetchFailure: (state, action) => {},
  },
})

export const { fetch, fetchSuccess, fetchFailure } = validationResultSlice.actions

export default validationResultSlice.reducer
