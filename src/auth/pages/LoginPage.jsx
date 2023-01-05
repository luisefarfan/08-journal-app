import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { emailAndPasswordLogin, googleSignIn } from '../../store/auth/thunks'
import { useMemo } from 'react'
import { CHECKING_STATE } from '../../store/auth/constants'

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state)
  const dispatch = useDispatch()

  const { email, password, handleChange } = useForm({
    email: '',
    password: ''
  })

  const isAuthenticating = useMemo(() => status === CHECKING_STATE, [status])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(emailAndPasswordLogin({ email, password }))
  }

  const handleGoogleLogIn = () => {
    dispatch(googleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              value={email}
              name="email"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              value={password}
              name="password"
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type="submit" variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} onClick={handleGoogleLogIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crea una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
