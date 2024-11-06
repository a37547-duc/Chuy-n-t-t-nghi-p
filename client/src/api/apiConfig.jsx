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
//       return localStorage.getItem("userToken") || "";
//     }
//     return "";
// };

// api.interceptors.request.use((config) => {
//     const user = JSON.parse(getTokenFromLocalStorage());
//     if (user) {
//       config.headers.Authorization = `Bearer ${user}`;
//     }
//     return config;
// });