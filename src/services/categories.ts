import api from './api';
import type { CategoriesResponse, CategoryDetailResponse } from '@/types';

interface GetCategoriesParams {
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const categoriesService = {
  getAll: async (params: GetCategoriesParams = {}): Promise<CategoriesResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    
    const url = `/categories/all${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get<CategoriesResponse>(url);
    return response.data;
  },
  
  getDetail: async (id: number): Promise<CategoryDetailResponse> => {
    const response = await api.post<CategoryDetailResponse>('/categories/detail', { id });
    return response.data;
  }
};