import { defineStore } from 'pinia';
import type { StockMovement, Pagination } from '@/types';
import { stockMovementsService } from '@/services/stockMovements';
import type { GetStockMovementsParams } from '@/services/stockMovements';

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
    async fetchStockMovements(params: GetStockMovementsParams = {}) {
      try {
        this.loading = true;
        const response = await stockMovementsService.getAll(params);
        this.stockMovements = response.data.data;
        this.pagination = response.data.pagination;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch stock movements';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchStockMovementDetail(id: number) {
      try {
        this.loading = true;
        const response = await stockMovementsService.getDetail(id);
        this.currentStockMovement = response.data;
        this.error = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch stock movement';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
}); 