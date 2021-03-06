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
import { IStore } from '..'

interface IdProps {
  id: string
}

type StoreEditProps = Omit<
  IStore,
  'logotype' | 'lat' | 'lng' | 'category' | 'owner_id'
>

const Edit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<IdProps>()
  const initialFormData = Object.freeze<StoreEditProps>({
    id: 0,
    name: '',
    slug: '',
    description: ''
  })
  const [formData, setFormData] = React.useState(initialFormData)

  React.useEffect(() => {
    api.get<IStore>('/store/owner/' + id + '/').then(res => {
      setFormData({
        ...formData,
        name: res.data.name,
        slug: res.data.slug,
        description: res.data.description
      })
      console.log(res.data)
    })
  }, [setFormData])

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

    api.put(`admin/edit/` + id + '/', {
      name: formData.name,
      slug: formData.slug,
      owner: 3,
      description: formData.description
    })
    history.push({
      pathname: '/admin/'
    })
    window.location.reload()
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5" align="center" sx={{ m: 2 }}>
          Editar Loja
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'name'}
                label="Nome da loja"
                name="name"
                autoComplete="title"
                value={formData.name}
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
                id={'slug'}
                label="slug"
                name="slug"
                autoComplete="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'description'}
                label="Descri????o"
                name="description"
                autoComplete="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={8}
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
                Editar loja
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Edit
