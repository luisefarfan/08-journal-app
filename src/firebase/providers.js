import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
