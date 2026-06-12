import { create } from "zustand";

type UserRole = "patient" | "doctor" | "admin";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
}

export const useAuthStore = create<AuthState>(() => ({
  isAuthenticated: true,
  role: "patient",
}));