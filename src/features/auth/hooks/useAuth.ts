import { useAuthStore } from "../../../store/authStore";

export const useAuth = () => {
  const auth = useAuthStore();

  return auth;
};