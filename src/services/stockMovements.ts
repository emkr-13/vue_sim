import type {
  StockMovementsResponse,
  StockMovementDetailResponse,
} from '@/types/transaction.types';
import api from './api';

export interface GetStockMovementsParams {
  search?: string;
  movementType?: 'in' | 'out';
  sortBy?: 'name' | 'createdAt'|'productName'|'quantity'|'movementType';
  sortOrder?: 'asc' | 'desc';
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const stockMovementsService = {



  getAll: async (params: GetStockMovementsParams = {}): Promise<StockMovementsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.movementType) queryParams.append('movementType', params.movementType);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    
    const url = `/stock-movements/all${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get<StockMovementsResponse>(url);
    return response.data;
  },



  getDetail: async (id: number): Promise<StockMovementDetailResponse> => {
    const response = await api.post<StockMovementDetailResponse>('/stock-movements/detail', { id });
    return response.data;
  },


}; 