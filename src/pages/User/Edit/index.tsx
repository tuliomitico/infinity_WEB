import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../../services/api'
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material'

interface IUser {
  username: string
  // eslint-disable-next-line camelcase
  first_name: string
}

const UserEdit: React.FC = () => {
  const history = useHistory()

  const initialFormData = Object.freeze<IUser>({
    username: '',
    // eslint-disable-next-line camelcase
    first_name: ''
  })
  const [formData, setFormData] = React.useState(initialFormData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    console.log(formData)

    api.patch(`/user/delete/`, {
      username: formData.username,
      first_name: formData.first_name
    })
    history.push({
      pathname: '/'
    })
    window.location.reload()
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5" align="center" sx={{ m: 2 }}>
          Editar Perfil
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'username'}
                label="Nome de usuário"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'excerpt'}
                label="Post excerpt"
                name="excerpt"
                autoComplete="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'firstName'}
                label="Primeiro nome"
                name="first_name"
                autoComplete="firstName"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} alignContent="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Editar Perfil
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default UserEdit
