import { defineStore } from 'pinia';
import type { Purchase, Pagination } from '@/types';
import { purchasesService } from '@/services/purchases';

interface PurchasesState {
  purchases: Purchase[];
  currentPurchase: Purchase | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

export const usePurchasesStore = defineStore('purchases', {
  state: (): PurchasesState => ({
    purchases: [],
    currentPurchase: null,
    pagination: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPurchases(page: number = 1, limit: number = 10) {
      try {
        this.loading = true;
        const response = await purchasesService.getPurchases(page, limit);
        this.purchases = response.data.data.data;
        this.pagination = response.data.data.pagination;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch purchases';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchPurchaseById(id: string) {
      try {
        this.loading = true;
        const response = await purchasesService.getPurchaseById(id);
        this.currentPurchase = response.data.data;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createPurchase(data: any) {
      try {
        this.loading = true;
        const response = await purchasesService.createPurchase(data);
        this.purchases.unshift(response.data.data);
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to create purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePurchase(id: string, data: any) {
      try {
        this.loading = true;
        const response = await purchasesService.updatePurchase(id, data);
        const index = this.purchases.findIndex(p => p.id === id);
        if (index !== -1) {
          this.purchases[index] = response.data.data;
        }
        if (this.currentPurchase?.id === id) {
          this.currentPurchase = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to update purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deletePurchase(id: string) {
      try {
        this.loading = true;
        await purchasesService.deletePurchase(id);
        this.purchases = this.purchases.filter(p => p.id !== id);
        if (this.currentPurchase?.id === id) {
          this.currentPurchase = null;
        }
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to delete purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async orderPurchase(id: string) {
      try {
        this.loading = true;
        const response = await purchasesService.orderPurchase(id);
        const index = this.purchases.findIndex(p => p.id === id);
        if (index !== -1) {
          this.purchases[index] = response.data.data;
        }
        if (this.currentPurchase?.id === id) {
          this.currentPurchase = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to order purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async receivePurchase(id: string) {
      try {
        this.loading = true;
        const response = await purchasesService.receivePurchase(id);
        const index = this.purchases.findIndex(p => p.id === id);
        if (index !== -1) {
          this.purchases[index] = response.data.data;
        }
        if (this.currentPurchase?.id === id) {
          this.currentPurchase = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to receive purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cancelPurchase(id: string) {
      try {
        this.loading = true;
        const response = await purchasesService.cancelPurchase(id);
        const index = this.purchases.findIndex(p => p.id === id);
        if (index !== -1) {
          this.purchases[index] = response.data.data;
        }
        if (this.currentPurchase?.id === id) {
          this.currentPurchase = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to cancel purchase';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
}); 