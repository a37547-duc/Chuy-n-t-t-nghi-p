import axios from 'axios';
import { toast } from 'react-toastify';

export const API_BASE_URL = 'https://laptech4k.onrender.com/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

export const apiFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
      "Content-Type": "application/json"
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiFormData.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      // if (!toast.isActive("getSessionExpiredError")) {
      //   toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại", { toastId: "getSessionExpiredError" });
      // }
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      // if (!toast.isActive("getSessionExpiredError")) {
      //   toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại", { toastId: "getSessionExpiredError" });
      // }
      toast.info("Bạn cần đăng nhập để áp dụng mức khuyến mãi");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);
