import React from 'react'
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useHistory } from 'react-router'

import api from '../../../services/api'
import { IStore } from '..'
import { Box } from '@mui/system'
import { useAuth } from '../../../hooks/auth'

type PostCreateProps = Omit<IStore, 'id' | 'logotype' | 'owner_id'>

type Image = {
  logotype: File
}

const Create: React.FC = () => {
  const { userId } = useAuth()
  function slugify(str: string) {
    const a =
      'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b =
      'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return str
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w\\-]+/g, '')
      .replace(/\\-\\-+/g, '-')
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
  const history = useHistory()
  const initialFormData = Object.freeze<PostCreateProps>({
    name: '',
    slug: '',
    description: '',
    category: '',
    lat: 0,
    lng: 0
  })
  const [postData, setPostData] = React.useState(initialFormData)
  const [postImage, SetPostImage] = React.useState<Image>({} as Image)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ([e.target.name].includes('logotype')) {
      SetPostImage({
        logotype: (e.target.files as FileList)[0]
      })
      console.log(e.target.files)
    }
    if ([e.target.name].includes('name')) {
      setPostData({
        ...postData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        slug: slugify(e.target.value.trim())
      })
    } else {
      setPostData({
        ...postData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      })
    }
  }

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const formData = new FormData()
    console.log(postData)
    formData.append('name', postData.name)
    formData.append('category', postData.category)
    formData.append('slug', postData.slug as string)
    formData.append('owner', userId || (3).toString())
    formData.append('description', postData.description)
    formData.append('lat', postData.lat.toString())
    formData.append('lng', postData.lng.toString())
    formData.append('logotype', postImage.logotype)
    console.log(formData)

    api
      .post(
        `/store/`,

        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .then(res => {
        history.push('/')
      })
      .catch(err => console.error(err.message))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar></Avatar>
        <Typography component="h1" variant="h5">
          Criar uma nova loja
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'name'}
                label="Nome da Loja"
                name="name"
                autoComplete="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'category'}
                label="Categoria"
                name="category"
                autoComplete="category"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'slug'}
                label="slug"
                name="slug"
                autoComplete="slug"
                value={postData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'description'}
                label="Descrição"
                name="description"
                autoComplete="description"
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'lat'}
                label="Latitude"
                name="lat"
                autoComplete="lat"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={'lng'}
                label="Longitude"
                name="lng"
                autoComplete="lng"
                onChange={handleChange}
              />
            </Grid>
            <input
              accept="image/*"
              id="post-image"
              onChange={handleChange}
              name="logotype"
              type="file"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Create
