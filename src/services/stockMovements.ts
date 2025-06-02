import type {
  StockMovementsResponse,
  StockMovementDetailResponse,
  CreateStockMovementRequest,
  UpdateStockMovementRequest,
} from '@/types/transaction.types';
import api from './api';

export const stockMovementsService = {
  async getStockMovements(page: number = 1, limit: number = 10) {
    return api.get<StockMovementsResponse>(`/stock-movements?page=${page}&limit=${limit}`);
  },

  async getStockMovementById(id: string) {
    return api.get<StockMovementDetailResponse>(`/stock-movements/${id}`);
  },

  async createStockMovement(data: CreateStockMovementRequest) {
    return api.post<StockMovementDetailResponse>('/stock-movements', data);
  },

  async updateStockMovement(id: string, data: UpdateStockMovementRequest) {
    return api.put<StockMovementDetailResponse>(`/stock-movements/${id}`, data);
  },

  async deleteStockMovement(id: string) {
    return api.delete<{ success: boolean; message: string }>(`/stock-movements/${id}`);
  },

  async completeStockMovement(id: string) {
    return api.put<StockMovementDetailResponse>(`/stock-movements/${id}/complete`);
  },

  async cancelStockMovement(id: string) {
    return api.put<StockMovementDetailResponse>(`/stock-movements/${id}/cancel`);
  }
}; 