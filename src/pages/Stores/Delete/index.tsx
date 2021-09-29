import React from 'react'
import api from '../../../services/api'
import { useHistory, useParams } from 'react-router-dom'
// MaterialUI
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface IdProps {
  id: string
}
const Delete: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<IdProps>()

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    api
      .delete('/store/delete/' + id + '/')
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
      .then(function () {
        history.push({
          pathname: '/'
        })
        window.location.reload()
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Clique aqui para descadastrar a loja
        </Button>
      </Box>
    </Container>
  )
}

export default Delete
