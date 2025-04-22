import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  const token = Cookies.get('token');

  const excludedPaths = ['/auth/login', '/auth/signup'];
  const isExcluded = excludedPaths.some(path =>
    config.url?.endsWith(path)
  );

  if (token && !isExcluded) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
