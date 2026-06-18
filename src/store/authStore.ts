import { create } from "zustand";
import type {
  AuthUser,
  UserRole,
} from "../features/auth/types/auth.types";

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;
  refreshToken: string | null;

  role: UserRole | null;

  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;

  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  accessToken: null,
  refreshToken: null,

  role: null,

  isAuthenticated: false,

  login: (
    user,
    accessToken,
    refreshToken
  ) => {
    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({
      user,
      role: user.role,

      accessToken,
      refreshToken,

      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    set({
      user: null,

      role: null,

      accessToken: null,
      refreshToken: null,

      isAuthenticated: false,
    });
  },

  restoreSession: () => {
    const accessToken =
      localStorage.getItem("accessToken");

    const refreshToken =
      localStorage.getItem("refreshToken");

    const userData =
      localStorage.getItem("user");

    if (accessToken && refreshToken && userData) {
      try {
        const user = JSON.parse(userData);

        set({
          user,
          role: user.role,

          accessToken,
          refreshToken,

          isAuthenticated: true,
        });
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        set({
          user: null,
          role: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      }
    }
  },
}));
