export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface UserProfile {
  email: string;
  fullname: string;
  usercreated: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
} 