import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { firebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(firebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result) // Para obtener el access token

    const { displayName, email, photoURL, uid } = user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  }
  catch (e) {
    const errorCode = e.errorCode
    const errorMessage = e.message

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password)

    const { displayName, photoURL, uid } = user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  }
  catch (e) {
    const errorCode = e.errorCode
    const errorMessage = e.message

    console.log(e)

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const { uid, photoURL } = res.user

    await updateProfile(firebaseAuth.currentUser, { displayName: displayName })

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  }
  catch (e) {
    return { ok: false, errorMessage: e.message }
  }
}

export const logoutFromFirebase = async () => {
  try {
    return await firebaseAuth.signOut()
  }
  catch (e) {
    return { ok: false, errorMessage: e.message }
  }
}
