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

    console.log("[Axios Interceptor] Token from store:", token ? `${token.substring(0, 20)}...` : "NULL/UNDEFINED");
    console.log("[Axios Interceptor] Request URL:", config.url);

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log("[Axios Interceptor] Authorization header:", config.headers.Authorization);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
