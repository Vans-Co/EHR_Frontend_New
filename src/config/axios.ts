import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "https://ehrbackend-production-a3a0.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: on 401, refresh the tokens once and retry the
// request; if the refresh fails, log out and go back to the login page.
let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as RetriableConfig | undefined;
    const { refreshToken, setTokens, logout } = useAuthStore.getState();

    const isAuthCall = config?.url?.startsWith("/auth/");
    if (
      error.response?.status !== 401 ||
      !config ||
      config._retried ||
      isAuthCall ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }
    config._retried = true;

    // share one refresh call between concurrent 401s
    refreshPromise ??= axios
      .post(`${api.defaults.baseURL}/auth/refresh-token`, { refreshToken })
      .then(({ data }) => {
        const access = data.accessToken ?? data.generateAccessToken;
        const refresh = data.refreshToken ?? data.generateRefreshToken;
        setTokens(access, refresh);
        return access as string;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });

    const newToken = await refreshPromise;
    if (!newToken) {
      logout();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return api(config);
  }
);

export default api;
