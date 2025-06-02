import { Pagination } from './common.types';

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