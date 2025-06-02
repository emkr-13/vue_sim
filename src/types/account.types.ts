import { Pagination } from './common.types';

export interface Account {
  id: number;
  name: string;
  type: "supplier" | "customer";
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountsResponse {
  success: boolean;
  message: string;
  data: {
    data: Account[];
    pagination: Pagination;
  };
}

export interface AccountDetailResponse {
  success: boolean;
  message: string;
  data: Account;
}

export interface CreateAccountRequest {
  name: string;
  type: "supplier" | "customer";
  email: string;
  phone: string;
  address: string;
}

export interface UpdateAccountRequest extends CreateAccountRequest {
  id: number;
} 