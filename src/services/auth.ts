import api from './api';
import type { LoginCredentials, LoginResponse, UserProfileResponse } from '@/types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  
  getUserProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>('/user/detail');
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  }
};