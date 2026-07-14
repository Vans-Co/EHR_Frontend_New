import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
 baseURL: "https://ehrbackend-production-a3a0.up.railway.app/api", // putting url directly for testing
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
