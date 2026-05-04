import axios from 'axios';

// The service backend URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7775/api/v1';

// The gateway backend URL (for login)
export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:6664/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pegawai_access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response.data.data || response.data;
  },
  (error) => Promise.reject(error)
);

export default api;

export const gatewayApi = axios.create({
  baseURL: GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
