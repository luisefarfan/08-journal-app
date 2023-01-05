import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { firebaseAuth } from '../firebase/config'
import { useCheckAuth } from '../hooks'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { login, logout } from '../store/auth/authSlice'
import { AUTHENTICATED_STATE, CHECKING_STATE } from '../store/auth/constants'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === CHECKING_STATE) {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        status === AUTHENTICATED_STATE
          /* Login y registro */
          ? <Route path="/*" element={<JournalRoutes />} />
          /* Journal app */
          : <Route path="auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to='auth/login' />} />
    </Routes>
  )
}
