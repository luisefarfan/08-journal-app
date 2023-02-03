import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  // Devuelve una funcion que recibe una funcion y la ejecuta. En este caso un thunk
  useDispatch: () => (thunk) => thunk()
}))

const mockGoogleSignIn = jest.fn()
const mockEmailAndPasswordSignIn = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
  googleSignIn: () => mockGoogleSignIn,
  emailAndPasswordLogin: ({ email, password }) => () => mockEmailAndPasswordSignIn({ email, password })
}))

describe('LoginPage tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('login with google button should call googleSignIn thunk', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleLoginButton = screen.getByLabelText('google-btn')
    // No va a funcionar primero porque el estado inicial es checking, y el boton se deshabilita por eso
    fireEvent.click(googleLoginButton)

    expect(mockGoogleSignIn).toHaveBeenCalled()
  })

  test('submit calls emailAndPasswordLogin thunk', () => {
    const email = 'test@test.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'Correo' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, { target: { name: 'password', value: password } })

    const form = screen.getByLabelText('login-form')
    fireEvent.submit(form)

    expect(mockEmailAndPasswordSignIn).toHaveBeenCalledWith({ email, password })
  })
})
