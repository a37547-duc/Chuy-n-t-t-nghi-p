import axios from 'axios';
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
