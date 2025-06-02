import { defineStore } from 'pinia';
import type { Quotation, Pagination } from '@/types';
import { quotationsService } from '@/services/quotations';

interface QuotationsState {
  quotations: Quotation[];
  currentQuotation: Quotation | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

export const useQuotationsStore = defineStore('quotations', {
  state: (): QuotationsState => ({
    quotations: [],
    currentQuotation: null,
    pagination: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchQuotations(page: number = 1, limit: number = 10) {
      try {
        this.loading = true;
        const response = await quotationsService.getQuotations(page, limit);
        this.quotations = response.data.data.data;
        this.pagination = response.data.data.pagination;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch quotations';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchQuotationById(id: string) {
      try {
        this.loading = true;
        const response = await quotationsService.getQuotationById(id);
        this.currentQuotation = response.data.data;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createQuotation(data: any) {
      try {
        this.loading = true;
        const response = await quotationsService.createQuotation(data);
        this.quotations.unshift(response.data.data);
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to create quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateQuotation(id: string, data: any) {
      try {
        this.loading = true;
        const response = await quotationsService.updateQuotation(id, data);
        const index = this.quotations.findIndex(q => q.id === id);
        if (index !== -1) {
          this.quotations[index] = response.data.data;
        }
        if (this.currentQuotation?.id === id) {
          this.currentQuotation = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to update quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteQuotation(id: string) {
      try {
        this.loading = true;
        await quotationsService.deleteQuotation(id);
        this.quotations = this.quotations.filter(q => q.id !== id);
        if (this.currentQuotation?.id === id) {
          this.currentQuotation = null;
        }
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to delete quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async approveQuotation(id: string) {
      try {
        this.loading = true;
        const response = await quotationsService.approveQuotation(id);
        const index = this.quotations.findIndex(q => q.id === id);
        if (index !== -1) {
          this.quotations[index] = response.data.data;
        }
        if (this.currentQuotation?.id === id) {
          this.currentQuotation = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to approve quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async rejectQuotation(id: string) {
      try {
        this.loading = true;
        const response = await quotationsService.rejectQuotation(id);
        const index = this.quotations.findIndex(q => q.id === id);
        if (index !== -1) {
          this.quotations[index] = response.data.data;
        }
        if (this.currentQuotation?.id === id) {
          this.currentQuotation = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to reject quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async sendQuotation(id: string) {
      try {
        this.loading = true;
        const response = await quotationsService.sendQuotation(id);
        const index = this.quotations.findIndex(q => q.id === id);
        if (index !== -1) {
          this.quotations[index] = response.data.data;
        }
        if (this.currentQuotation?.id === id) {
          this.currentQuotation = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to send quotation';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
}); 