import { SignUpCredentials } from '../hooks/auth'
import api from './api'

interface IUser {
  username: string
  password: string
}

export interface ITokenData {
  data: { access: string; refresh: string }
}

class AuthService {
  static signIn(data: IUser): Promise<ITokenData> {
    return api.post('/login/', data)
  }

  static signUp(data: SignUpCredentials): Promise<null> {
    return api.post('/user/create/', data)
  }
}

export default AuthService
