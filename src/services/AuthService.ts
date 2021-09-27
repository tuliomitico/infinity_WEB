import api from './api'

interface IUser {
  username: string
  password: string
}

class AuthService {
  static signIn(data: IUser): Promise<any> {
    return api.post('/login/', data)
  }

  static signUp(data: any): Promise<any> {
    return api.post('/user/create', data)
  }
}
