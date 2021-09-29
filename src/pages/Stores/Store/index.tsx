import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  CssBaseline,
  Typography,
  Container,
  createTheme,
  ThemeProvider
} from '@mui/material'
import { IStore } from '..'
import api from '../../../services/api'
import theme from './styles'

interface ParamsProps {
  slug: string
}

const Store: React.FC = () => {
  const { slug } = useParams<ParamsProps>()

  const [data, setData] = useState({} as IStore)

  useEffect(() => {
    async function loadData() {
      const response = await api.get<IStore>('/store/' + slug + '/')
      setData(response.data)
    }
    loadData()
  }, [setData])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div></div>
        <div>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center">
              {data.name}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              {data.description}
            </Typography>
          </Container>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default Store
