import type {
  PurchasesResponse,
  PurchaseDetailResponse,
  CreatePurchaseRequest,
  UpdatePurchaseRequest,
} from '@/types/transaction.types';
import api from './api';

export const purchasesService = {
  async getPurchases(page: number = 1, limit: number = 10) {
    return api.get<PurchasesResponse>(`/purchases?page=${page}&limit=${limit}`);
  },

  async getPurchaseById(id: string) {
    return api.get<PurchaseDetailResponse>(`/purchases/${id}`);
  },

  async createPurchase(data: CreatePurchaseRequest) {
    return api.post<PurchaseDetailResponse>('/purchases', data);
  },

  async updatePurchase(id: string, data: UpdatePurchaseRequest) {
    return api.put<PurchaseDetailResponse>(`/purchases/${id}`, data);
  },

  async deletePurchase(id: string) {
    return api.delete<{ success: boolean; message: string }>(`/purchases/${id}`);
  },

  async orderPurchase(id: string) {
    return api.put<PurchaseDetailResponse>(`/purchases/${id}/order`);
  },

  async receivePurchase(id: string) {
    return api.put<PurchaseDetailResponse>(`/purchases/${id}/receive`);
  },

  async cancelPurchase(id: string) {
    return api.put<PurchaseDetailResponse>(`/purchases/${id}/cancel`);
  }
}; 