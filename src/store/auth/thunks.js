import { registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkAuthentication = (email, password) => {
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

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await registerUserWithEmailAndPassword({ email, password, displayName })

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(login(result))
  }
}
