import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch } from 'react-redux'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    displayName,
    email,
    password,
    handleChange,
    formIsValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(formData, formValidations)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!formIsValid) return

    dispatch(startCreatingUserWithEmailAndPassword({ email, password, displayName }))
  }

  return (
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              onChange={handleChange}
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted && displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={handleChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={handleChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
