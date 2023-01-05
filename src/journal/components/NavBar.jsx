import React from 'react'
import { AppBar, Toolbar, IconButton, Grid, Typography } from '@mui/material'
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <AppBar position="fixed" sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` }
    }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuOutlined />
        </IconButton>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography>JournalApp</Typography>

          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar >
  )
}
