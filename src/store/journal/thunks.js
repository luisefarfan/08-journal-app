import { collection, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote } from "./journalSlice"

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
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

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth

    const { activeNote } = getState().journal

    const noteToFirestore = {
      ...activeNote
    }

    delete noteToFirestore.id

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`)

    // El tercer argumento es para opciones x. En este caso merge es para que actualice las propiedades a las que le cae encima
    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updateNote(activeNote))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
  }
}
