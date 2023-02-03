import { loginWithEmailAndPassword, logoutFromFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesOnLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const googleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(login(result))
  }
}

export const emailAndPasswordLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailAndPassword({ email, password })

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await registerUserWithEmailAndPassword({ email, password, displayName })

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(login(result))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFromFirebase()

    dispatch(clearNotesOnLogout())

    dispatch(logout())
  }
}
