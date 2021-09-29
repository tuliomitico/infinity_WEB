import axios from 'axios'
import AuthService from './AuthService'

const baseURL = 'http://localhost:8000'

const api = axios.create({
  baseURL
})

api.interceptors.response.use(
  response => response,
  async (error: any) => {
    const originalRequest = error.config
    const refreshT = localStorage.getItem('refresh')
    console.log(refreshT)
    const refreshToken = refreshT ? JSON.parse(refreshT) : null

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true
      const response = await AuthService.getNewToken({ refresh: refreshToken })
      const { access: token } = response.data
      localStorage.setItem('token', JSON.stringify(token))
      api.defaults.headers.Authorization = `Bearer ${token}`
      return api(originalRequest)
    }
    return Promise.reject(error)
  }
)
export default api
