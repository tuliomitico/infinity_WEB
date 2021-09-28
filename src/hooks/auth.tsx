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
  user: string | null
  authenticated: boolean
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)
export const history = createBrowserHistory()

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const authenticated = !!user

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setUser(user || '')
    }

    setLoading(false)
  }, [])
  const signIn = async (data: SignInCredentials) => {
    const {
      data: { access: token, username, refresh }
    } = await AuthService.signIn(data)
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('refresh', JSON.stringify(refresh))
    localStorage.setItem('user', username)
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(username)
    history.push('/')
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
    setUser('')
    api.defaults.headers.Authorization = undefined
    history.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ user, authenticated, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const ctx = useContext(AuthContext)

  return ctx
}
