import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks'
import { useRef } from 'react'

export const NoteView = () => {
  const dispatch = useDispatch()
  const { activeNote, savedMessage, isSaving } = useSelector((state) => state.journal)

  // Solo asi no se va a actualizar la view porque el componente no se vuelve a crear. Hay que
  // decirle al useForm que si el initialForm cambia, se vuelva a renderizar
  const { title, body, date, handleChange, formState } = useForm(activeNote)

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (savedMessage.trim() !== '') {
      Swal.fire('Nota actualizada', savedMessage, 'success')
    }
  }, [savedMessage])


  const saveNote = () => {
    dispatch(startSavingNote())
  }

  const handleFileInputChange = ({ target }) => {
    if (target.files.length === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  const handleNoteDelete = () => {
    dispatch(startDeletingNote(activeNote.id))
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <IconButton color='primary' disabled={isSaving} onClick={(() => fileInputRef.current.click())}>
          <UploadOutlined />
        </IconButton>

        <Button color="primary" sx={{ p: 2 }} onClick={saveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Titulo"
          value={title}
          onChange={handleChange}
          name='title'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio en el dia de hoy?"
          label="Descripcion"
          minRows={5}
          value={body}
          onChange={handleChange}
          name='body'
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={handleNoteDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  )
}
