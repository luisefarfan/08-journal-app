import { collection, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./journalSlice"

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    // Se le envia la configuracion de la base de datos y la coleccion donde se va a crear el documento
    const newDocument = doc(collection(firebaseDB, `${uid}/journal/notes`))

    // Se le envia el documento donde se va a crear y los datos que tendra
    await setDoc(newDocument, newNote)

    newNote.id = newDocument.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!uid) throw new Error('El uid del usuario no existe')

    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
  }
}
