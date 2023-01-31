import { createSlice } from '@reduxjs/toolkit'
import { AUTHENTICATED_STATE, CHECKING_STATE, NOT_AUTHENTICATED_STATE } from './constants'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: CHECKING_STATE,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, { payload }) => {
      const { uid, email, displayName, photoURL } = payload

      state.status = AUTHENTICATED_STATE
      state.uid = uid
      state.email = email
      state.displayName = displayName
      state.photoURL = photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = NOT_AUTHENTICATED_STATE
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload || null
    },
    checkingCredentials: (state) => {
      state.status = CHECKING_STATE
    }
  }
})

export const { login, logout, checkingCredentials } = authSlice.actions
