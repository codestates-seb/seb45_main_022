import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_BASE_URL;

const customAxios = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});

customAxios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default customAxios;
