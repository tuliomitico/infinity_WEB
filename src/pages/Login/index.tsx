import * as React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { SignInCredentials, useAuth } from '../../hooks/auth'

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Infinity Challenge
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const Login: React.FC = () => {
  const { signIn } = useAuth()
  const { register, handleSubmit } = useForm()
  const handleLogin = async (data: SignInCredentials) => {
    console.debug('Login', data)
    await signIn(data)
  }
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password')
  //   })
  // }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'lightgreen' }}>
            <AllInclusiveIcon sx={{ m: 1, color: 'blue' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fazer login na Infinity Challenge
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('username')}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de Usuário"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              {...register('password')}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim ?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  to="/register"
                  component={NavLink}
                >
                  {'Não tem uma conta? Registre-se'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Login
