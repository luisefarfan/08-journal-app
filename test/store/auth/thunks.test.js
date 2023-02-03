import { loginWithEmailAndPassword, signInWithGoogle, logoutFromFirebase, registerUserWithEmailAndPassword } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, emailAndPasswordLogin, googleSignIn, startCreatingUserWithEmailAndPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesOnLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/providers')

describe('Auth thunks tests', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should invoke checking credentials', async () => {
    // Thunk con el mock del dispatch que se le envia
    await checkingAuthentication()(dispatch)

    // CheckingCredentials es la action que se debe ejecutar
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn should call checkingCredentials and login actions - success', async () => {
    const loginData = { ok: true, ...demoUser }

    // Mock the firebase return value
    await signInWithGoogle.mockResolvedValue(loginData)

    await googleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn should call checkingCredentials and logout with an error message - error', async () => {
    const loginData = { ok: false, errorMessage: 'An error ocurred on google' }

    await signInWithGoogle.mockResolvedValue(loginData)

    await googleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLoginWithEmailAndPassword should call checkingCredentials and login - success', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailAndPassword.mockResolvedValue(loginData)

    await emailAndPasswordLogin(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLoginWithEmailAndPassword should call checkingCredentials and logout - error', async () => {
    const loginData = { ok: false, errorMessage: 'An error ocurred on google' }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailAndPassword.mockResolvedValue(loginData)

    await emailAndPasswordLogin(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startCreatingUserWithEmailAndPassword should call checkingCredentials and login - success', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailAndPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startCreatingUserWithEmailAndPassword should call checkingCredentials and logout - error', async () => {
    const loginData = { ok: false, errorMessage: 'An error ocurred on google' }
    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailAndPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLogout should call clearNotesLogout and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFromFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesOnLogout())
  })
})
