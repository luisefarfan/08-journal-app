import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
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
