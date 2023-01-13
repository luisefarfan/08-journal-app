import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../firebase/config"

export const loadNotes = async (uid) => {
  // Obtener la referencia a la coleccion
  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)

  // Hacer el query. En este caso queremos todos los documentos de la coleccion, entonces solo la mandamos
  const documents = await getDocs(collectionRef)

  const notes = []
  documents.forEach(doc => {
    // doc.data() retorna todos los campos del documento
    notes.push({ id: doc.id, ...doc.data() })
  })

  return notes
}
