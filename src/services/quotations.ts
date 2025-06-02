import type {
  QuotationsResponse,
  QuotationDetailResponse,
  CreateQuotationRequest,
  UpdateQuotationRequest,
} from '@/types';
import api from './api';

export const quotationsService = {
  async getQuotations(page: number = 1, limit: number = 10) {
    return api.get<QuotationsResponse>(`/quotations?page=${page}&limit=${limit}`);
  },

  async getQuotationById(id: string) {
    return api.get<QuotationDetailResponse>(`/quotations/${id}`);
  },

  async createQuotation(data: CreateQuotationRequest) {
    return api.post<QuotationDetailResponse>('/quotations', data);
  },

  async updateQuotation(id: string, data: UpdateQuotationRequest) {
    return api.put<QuotationDetailResponse>(`/quotations/${id}`, data);
  },

  async deleteQuotation(id: string) {
    return api.delete<{ success: boolean; message: string }>(`/quotations/${id}`);
  },

  async approveQuotation(id: string) {
    return api.put<QuotationDetailResponse>(`/quotations/${id}/approve`);
  },

  async rejectQuotation(id: string) {
    return api.put<QuotationDetailResponse>(`/quotations/${id}/reject`);
  },

  async sendQuotation(id: string) {
    return api.put<QuotationDetailResponse>(`/quotations/${id}/send`);
  }
}; 