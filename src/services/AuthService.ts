import { SignUpCredentials } from '../hooks/auth'
import api from './api'

interface IUser {
  username: string
  password: string
}

export interface ITokenData {
  data: { access: string; refresh: string; username: string }
}

class AuthService {
  static signIn(data: IUser): Promise<ITokenData> {
    return api.post('/login/', data)
  }

  static signUp(data: SignUpCredentials): Promise<null> {
    return api.post('/user/create/', data)
  }

  static getNewToken(data: any): Promise<Record<string, any>> {
    return api.post('/refresh/', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem('token') || ''
        )}`
      }
    })
  }
}

export default AuthService
