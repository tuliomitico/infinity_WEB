import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import AuthService from '../services/AuthService'
import { createBrowserHistory } from 'history'
export interface SignInCredentials {
  username: string
  password: string
}

export interface SignUpCredentials {
  username: string
  telephone: string
  email: string
  password: string
  cpf: string
}

interface AuthContextData {
  authenticated: boolean
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)
export const history = createBrowserHistory()

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])
  const signIn = async (data: SignInCredentials) => {
    const {
      data: { access: token }
    } = await AuthService.signIn(data)
    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.Authorization = `Bearer ${token}`
    setAuthenticated(true)
    history.push('/register')
  }

  const signOut = () => {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    history.push('/')
  }

  return (
    <AuthContext.Provider value={{ authenticated, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const ctx = useContext(AuthContext)

  return ctx
}
