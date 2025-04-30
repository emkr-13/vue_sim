import api from './api';
import type { CategoriesResponse, CategoryDetailResponse } from '@/types';

export const categoriesService = {
  getAll: async (limit: number = 10, page: number = 1): Promise<CategoriesResponse> => {
    const response = await api.get<CategoriesResponse>(`/categories/all?limit=${limit}&page=${page}`);
    return response.data;
  },
  
  getDetail: async (id: number): Promise<CategoryDetailResponse> => {
    const response = await api.post<CategoryDetailResponse>('/categories/detail', { id });
    return response.data;
  }
};