import axios from 'axios';
import { toast } from 'react-toastify';
export const API_BASE_URL = 'https://laptech4k.onrender.com/api/v1';


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

// export const getTokenFromLocalStorage = () => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("access_token") || "";
//     }
//     return "";
// };

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");

//     console.log("LẤY TOKEN TỪ LOCALSTORAGE: ", token);

//     if (token) {
//       config.headers.Authorization = `bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại")
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
