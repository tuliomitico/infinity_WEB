import React from 'react'
import { Typography, Link, TypographyProps } from '@mui/material'

type Props = TypographyProps

export default function Copyright(props: Props): JSX.Element {
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
