import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// api.interceptors.request.use(config => {
//     const path=window.location.pathname;
//     const token = Cookies.get('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers.set('path', path);
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

export default api;