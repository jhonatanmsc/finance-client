import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // import.meta.env.REACT_APP_API_BASE_URL,
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
  response => response,
  error => {
    if (error.response?.status === 404) {
      window.location.href = '/404';
    }
    return Promise.reject(error);
  }
)

export default api;
