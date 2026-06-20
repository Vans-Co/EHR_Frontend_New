import api from "../../../config/axios";
import type {
  LoginRequest,
  TokenResponse,
} from "../types/auth.types";

export const loginUser = async (
  data: LoginRequest
): Promise<TokenResponse> => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<TokenResponse> => {
  const response = await api.post(
    "/auth/refresh-token",
    {
      refreshToken,
    }
  );

  return response.data;
};