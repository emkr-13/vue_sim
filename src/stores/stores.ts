import { defineStore } from "pinia";
import { ref } from "vue";
import { storesService } from "@/services/stores";
import type {
  Store,
  Pagination,
  CreateStoreRequest,
  UpdateStoreRequest,
} from "@/types";

interface FetchStoresOptions {
  search?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const useStoresStore = defineStore("stores", () => {
  const stores = ref<Store[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedStore = ref<Store | null>(null);

  async function fetchStores(options: FetchStoresOptions = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await storesService.getAll(options);
      stores.value = response.data.data;
      pagination.value = response.data.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch stores";
    } finally {
      loading.value = false;
    }
  }

  async function fetchStoreDetail(id: number) {
    loading.value = true;
    error.value = null;

    try {
      const response = await storesService.getDetail(id);
      selectedStore.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch store details";
    } finally {
      loading.value = false;
    }
  }

  async function createStore(data: CreateStoreRequest) {
    loading.value = true;
    error.value = null;

    try {
      await storesService.create(data);
      await fetchStores();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create store";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function updateStore(data: UpdateStoreRequest) {
    loading.value = true;
    error.value = null;

    try {
      await storesService.update(data);
      await fetchStores();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update store";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function deleteStore(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await storesService.delete(id);
      await fetchStores();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete store";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  return {
    stores,
    pagination,
    loading,
    error,
    selectedStore,
    fetchStores,
    fetchStoreDetail,
    createStore,
    updateStore,
    deleteStore,
  };
});
