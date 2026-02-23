import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor для добавления токена к каждому запросу
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
