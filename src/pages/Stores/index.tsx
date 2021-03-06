import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Add } from '@mui/icons-material'
import { NavLink, useHistory } from 'react-router-dom'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import Copyright from '../../components/Copyright'
import SearchBar from '../../utils/SearchBar'
export interface IStore {
  id: number
  name: string
  description: string
  slug: string
  lat: number
  lng: number
  logotype: File | string
  category: string
  // eslint-disable-next-line camelcase
  owner_id: number
}

const theme = createTheme()

const Stores: React.FC = () => {
  const history = useHistory()
  const { user, signOut } = useAuth()
  const [data, setData] = useState([] as IStore[])
  const [word, setWord] = useState({ search: '' })

  const goSearch = (e: unknown) => {
    history.push({
      pathname: '/search/',
      search: '?search=' + word.search
    })
    window.location.reload()
  }
  async function loadData() {
    const response = await api.get('/store/')
    setData(response.data)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ bgcolor: 'lightgreen' }}>
          <AllInclusiveIcon sx={{ mr: 2, color: 'blue' }} />
          <Typography variant="h6" color="black" noWrap>
            Lojas cadastradas
          </Typography>
          <SearchBar
            value={word.search}
            onChange={newValue => setWord({ search: newValue })}
            onRequestSearch={() => goSearch(word.search)}
            onCancelSearch={() => null}
          />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Lojas Cadastradas
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Aqui voc?? encontrar?? todas as lojas que cont??m com a assist??ncia
              da Infinity Brasil. T?? esperando o que para fazer parte do time?
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {user ? (
                <Typography>Ol??,{user}</Typography>
              ) : (
                <Button variant="contained" to="/login" component={NavLink}>
                  Login
                </Button>
              )}
              <Button variant="outlined" to="/register" component={NavLink}>
                Cadastre-se
              </Button>
              {user ? (
                <>
                  <Button size="small" onClick={signOut}>
                    Logout
                  </Button>
                  <Link to="/store" component={NavLink}>
                    <Add /> Adicionar Loja
                  </Link>
                  <Button variant="outlined" to="/edit" component={NavLink}>
                    Editar Perfil
                  </Button>
                </>
              ) : null}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map(card => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%'
                    }}
                    image={card.logotype as string}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      to={'/store/' + card.slug + '/'}
                      component={NavLink}
                    >
                      Ver
                    </Button>
                    <Button size="small">Editar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}

export default Stores
