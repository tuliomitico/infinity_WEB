import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import AuthService from '../services/AuthService'
import { useHistory } from 'react-router'
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
  userId: string | null
  authenticated: boolean
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory()
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const authenticated = !!user

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const id = localStorage.getItem('id')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setUser(user || '')
      setUserId(id || '')
    }

    setLoading(false)
  }, [])
  const signIn = async (data: SignInCredentials) => {
    const {
      data: { access: token, username, refresh, id }
    } = await AuthService.signIn(data)
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('refresh', JSON.stringify(refresh))
    localStorage.setItem('user', username)
    localStorage.setItem('id', id)
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(username)
    setUserId(id)
    window.location.href = '/'
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    setUser('')
    setUserId('')
    api.defaults.headers.Authorization = undefined
  }

  return (
    <AuthContext.Provider
      value={{ user, userId, authenticated, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const ctx = useContext(AuthContext)

  return ctx
}
