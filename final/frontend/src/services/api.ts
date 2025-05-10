import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080/skill/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add response interceptor for auth
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    window.location.href = '/signin';
  }
  return Promise.reject(error);
});
export default api;