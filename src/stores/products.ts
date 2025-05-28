import { defineStore } from "pinia";
import { ref } from "vue";
import { productsService } from "@/services/products";
import type {
  Product,
  Pagination,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

interface FetchProductsOptions {
  search?: string;
  categoryId?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedProduct = ref<Product | null>(null);

  async function fetchProducts(options: FetchProductsOptions = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await productsService.getAll(options);
      products.value = response.data.data;
      pagination.value = response.data.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch products";
    } finally {
      loading.value = false;
    }
  }

  async function fetchProductDetail(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await productsService.getDetail(id);
      selectedProduct.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch product details";
    } finally {
      loading.value = false;
    }
  }

  async function createProduct(data: CreateProductRequest) {
    loading.value = true;
    error.value = null;

    try {
      await productsService.create(data);
      await fetchProducts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create product";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(data: UpdateProductRequest) {
    loading.value = true;
    error.value = null;

    try {
      await productsService.update(data);
      await fetchProducts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update product";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await productsService.delete(id);
      await fetchProducts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete product";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    pagination,
    loading,
    error,
    selectedProduct,
    fetchProducts,
    fetchProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
