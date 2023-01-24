import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedMessage: '',
    notes: [],
    // La nota que esta activa
    activeNote: null
    // active: {
    //   id: 'ABC1234',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imageUrls: [] // Arreglo de https://x.com/x.jpg
    // }
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      // Recibe en el payload la nota que se va a activar
      state.activeNote = action.payload
      state.savedMessage = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state, action) => {
      state.isSaving = true
      state.savedMessage = ''

    },
    savingNewNote: (state) => {
      state.isSaving = true
    },
    updateNote: (state, action) => {
      state.isSaving = false

      state.notes = state.notes.map((note) => {
        if (action.payload.id === note.id) {
          return action.payload
        }

        return note
      })

      state.savedMessage = `${action.payload.title}, actualizada correctamente`
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload]
      state.isSaving = false
    },
    deleteNoteById: (state, action) => {

    },
    clearNotesOnLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.activeNote = null
    }
  }
})

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  savingNewNote,
  updateNote,
  deleteNoteById,
  setSaving,
  setPhotosToActiveNote,
  clearNotesOnLogout
} = journalSlice.actions
