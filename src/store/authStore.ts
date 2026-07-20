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
  isHydrated: boolean;

  login: (
    user: AuthUser,
    accessToken: string,
    refreshToken: string
  ) => void;

  updateUser: (
    updates: Partial<AuthUser>
  ) => void;

  setTokens: (
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
  isHydrated: false,

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
      isHydrated: true,
    });
  },

  updateUser: (updates) =>
    set((state) => {
      if (!state.user) {
        return state;
      }

      const user = {
        ...state.user,
        ...updates,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      return { user };
    }),

  setTokens: (
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

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isHydrated: true,
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
      isHydrated: true,
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
          isHydrated: true,
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
          isHydrated: true,
        });
      }
    } else {
      set({
        user: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    }
  },
}));
