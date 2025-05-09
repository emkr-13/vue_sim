import { defineStore } from 'pinia';
import { ref } from 'vue';
import { categoriesService } from '@/services/categories';
import type { Category, Pagination, CreateCategoryRequest, UpdateCategoryRequest } from '@/types';

interface FetchCategoriesOptions {
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref<Category | null>(null);

  async function fetchCategories(options: FetchCategoriesOptions = {}) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await categoriesService.getAll(options);
      categories.value = response.data.data;
      pagination.value = response.data.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch categories';
    } finally {
      loading.value = false;
    }
  }

  async function fetchCategoryDetail(id: number) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await categoriesService.getDetail(id);
      selectedCategory.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch category details';
    } finally {
      loading.value = false;
    }
  }

  async function createCategory(data: CreateCategoryRequest) {
    loading.value = true;
    error.value = null;

    try {
      await categoriesService.create(data);
      await fetchCategories();
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create category';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function updateCategory(data: UpdateCategoryRequest) {
    loading.value = true;
    error.value = null;

    try {
      await categoriesService.update(data);
      await fetchCategories();
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update category';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCategory(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await categoriesService.delete(id);
      await fetchCategories();
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete category';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    pagination,
    loading,
    error,
    selectedCategory,
    fetchCategories,
    fetchCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory
  };
});