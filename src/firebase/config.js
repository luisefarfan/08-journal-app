// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE6A52-36pe7r8kmrquIDVGi8rSb8WZ1E",
  authDomain: "react-cursos-a4952.firebaseapp.com",
  projectId: "react-cursos-a4952",
  storageBucket: "react-cursos-a4952.appspot.com",
  messagingSenderId: "473994712829",
  appId: "1:473994712829:web:91f53aeb93a34b110a9094"
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Para usar la autenticacion
export const firebaseAuth = getAuth(firebaseApp)

// Para usar la base de datos
export const firebaseDB = getFirestore(firebaseApp)
