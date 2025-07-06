import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }
  )

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 404) window.location.href = '/404';
    if (error.response?.status === 500) window.location.href = '/500';
    return Promise.reject(error);
  }
)

export default api;
