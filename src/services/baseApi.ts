import axios from 'axios'
import store from '@/store'
import { cilInfo } from '@coreui/icons'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error?.response) {
      store.dispatch({
        type: 'addMessages',
        messages: [
          {
            text: 'O Servidor está offline',
            icon: cilInfo,
            style: 'text-danger',
          },
        ],
      })
    }
    if (error.response?.status === 401) {
      let refreshToken =
        localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
      if (refreshToken) {
        let new_token = ''
        api
          .post('/token/refresh/', { refresh: refreshToken })
          .then((res: any) => {
            new_token = res.access
            if (localStorage.getItem('refreshToken')) {
              localStorage.setItem('accessToken', new_token)
            } else if (sessionStorage.getItem('refreshToken')) {
              sessionStorage.setItem('accessToken', new_token)
            }
            window.location.reload()
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              sessionStorage.removeItem('accessToken')
              sessionStorage.removeItem('refreshToken')
              window.location.href = '/login'
            } else if (err.response?.status) {
              window.location.href = '/401'
            }
          })
      } else window.location.href = '/login'
    }
    if (error.response?.status === 404) window.location.href = '/404'
    if (error.response?.status === 500) window.location.href = '/500'
    return Promise.reject(error)
  },
)

export default api
