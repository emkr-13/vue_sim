export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}

// Import from common types
import { Pagination } from './common.types'; 