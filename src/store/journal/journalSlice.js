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
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    savingNewNote: (state) => {
      state.isSaving = true
    },
    updateNote: (state, action) => {

    },
    deleteNoteById: (state, action) => {

    }
  }
})

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  savingNewNote,
  updateNote,
  deleteNoteById
} = journalSlice.actions
