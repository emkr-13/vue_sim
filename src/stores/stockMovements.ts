import { defineStore } from 'pinia';
import type { StockMovement, Pagination } from '@/types';
import { stockMovementsService } from '@/services/stockMovements';

interface StockMovementsState {
  stockMovements: StockMovement[];
  currentStockMovement: StockMovement | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

export const useStockMovementsStore = defineStore('stockMovements', {
  state: (): StockMovementsState => ({
    stockMovements: [],
    currentStockMovement: null,
    pagination: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStockMovements(page: number = 1, limit: number = 10) {
      try {
        this.loading = true;
        const response = await stockMovementsService.getStockMovements(page, limit);
        this.stockMovements = response.data.data.data;
        this.pagination = response.data.data.pagination;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch stock movements';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchStockMovementById(id: string) {
      try {
        this.loading = true;
        const response = await stockMovementsService.getStockMovementById(id);
        this.currentStockMovement = response.data.data;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createStockMovement(data: any) {
      try {
        this.loading = true;
        const response = await stockMovementsService.createStockMovement(data);
        this.stockMovements.unshift(response.data.data);
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to create stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateStockMovement(id: string, data: any) {
      try {
        this.loading = true;
        const response = await stockMovementsService.updateStockMovement(id, data);
        const index = this.stockMovements.findIndex(sm => sm.id === id);
        if (index !== -1) {
          this.stockMovements[index] = response.data.data;
        }
        if (this.currentStockMovement?.id === id) {
          this.currentStockMovement = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to update stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteStockMovement(id: string) {
      try {
        this.loading = true;
        await stockMovementsService.deleteStockMovement(id);
        this.stockMovements = this.stockMovements.filter(sm => sm.id !== id);
        if (this.currentStockMovement?.id === id) {
          this.currentStockMovement = null;
        }
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to delete stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async completeStockMovement(id: string) {
      try {
        this.loading = true;
        const response = await stockMovementsService.completeStockMovement(id);
        const index = this.stockMovements.findIndex(sm => sm.id === id);
        if (index !== -1) {
          this.stockMovements[index] = response.data.data;
        }
        if (this.currentStockMovement?.id === id) {
          this.currentStockMovement = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to complete stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cancelStockMovement(id: string) {
      try {
        this.loading = true;
        const response = await stockMovementsService.cancelStockMovement(id);
        const index = this.stockMovements.findIndex(sm => sm.id === id);
        if (index !== -1) {
          this.stockMovements[index] = response.data.data;
        }
        if (this.currentStockMovement?.id === id) {
          this.currentStockMovement = response.data.data;
        }
        this.error = null;
        return response.data.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to cancel stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
}); 