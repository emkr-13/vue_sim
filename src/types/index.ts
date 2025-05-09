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

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  location: string;
  manager: string;
  contactInfo: string | null;
  phone: string | null;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Pagination {
  total_data: string;
  total_page: number;
  total_display: number;
  first_page: boolean;
  last_page: boolean;
  prev: number;
  current: number;
  next: number;
  detail: number[];
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    pagination: Pagination;
  };
}

export interface CategoryDetailResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface StoresResponse {
  success: boolean;
  message: string;
  data: {
    data: Store[];
    pagination: Pagination;
  };
}

export interface StoreDetailResponse {
  success: boolean;
  message: string;
  data: Store;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}

export interface CreateStoreRequest {
  name: string;
  description: string;
  location: string;
  manager: string;
  contactInfo?: string;
  phone?: string;
  email: string;
  address: string;
}

export interface UpdateStoreRequest extends CreateStoreRequest {
  id: number;
}