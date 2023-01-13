import React from 'react'
import { Grid, Typography, Button, TextField } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'
import { ImageGallery } from '../components'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useMemo } from 'react'

export const NoteView = () => {
  const { activeNote } = useSelector((state) => state.journal)

  // Solo asi no se va a actualizar la view porque el componente no se vuelve a crear. Hay que
  // decirle al useForm que si el initialForm cambia, se vuelva a renderizar
  const { title, body, date, handleChange } = useForm(activeNote)

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
  }, [date])

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
        <Button color="primary" sx={{ p: 2 }}>
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

      <ImageGallery />
    </Grid>
  )
}
