import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL || "https://ehrbackend-production-a3a0.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
