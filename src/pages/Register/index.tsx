import React, { useCallback } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import AuthService from '../../services/AuthService'
import { SignUpCredentials } from '../../hooks/auth'
import Copyright from '../../components/Copyright'

const theme = createTheme()

const Register: React.FC = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const signUp = useCallback(
    async ({ username, email, cpf, telephone, password }) => {
      await AuthService.signUp({ username, email, cpf, telephone, password })
    },
    []
  )

  const handleSignUp = async (data: SignUpCredentials) => {
    await signUp(data)
    history.push('/')
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignUp)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('username')}
                  autoComplete="fname"
                  name="username"
                  required
                  fullWidth
                  id="userName"
                  label="Nome de usu??rio"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('cpf')}
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('telephone')}
                  required
                  fullWidth
                  name="telephone"
                  label="Telefone"
                  id="telephone"
                  autoComplete="telephone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  id="email"
                  label="Endere??o de Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="senha"
                  autoComplete="senha"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" to="/login" component={NavLink}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Register
