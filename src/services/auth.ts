import api from "./api";
import type {
  LoginCredentials,
  LoginResponse,
  UserProfileResponse,
} from "@/types";

export interface RefreshTokenRequest {
  refreshToken: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  getUserProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>("/user/profile");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refreshToken: async (
    refreshTokenData: RefreshTokenRequest
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/refresh-token",
      refreshTokenData
    );
    return response.data;
  },
};
