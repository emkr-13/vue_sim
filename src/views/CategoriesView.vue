<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import type { Category } from '@/types';

const categoriesStore = useCategoriesStore();
const currentPage = ref(1);
const itemsPerPage = ref<1 | 10 | 100 | 1000>(10);
const searchQuery = ref('');
const sortBy = ref<'name' | 'createdAt'>('createdAt');
const sortOrder = ref<'asc' | 'desc'>('desc');
const selectedCategory = ref<Category | null>(null);

onMounted(() => {
  loadCategories();
});

const loadCategories = async () => {
  await categoriesStore.fetchCategories({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: searchQuery.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value
  });
};

const handleSearch = async () => {
  currentPage.value = 1;
  await loadCategories();
};

const handleSort = async (field: 'name' | 'createdAt') => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  await loadCategories();
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await loadCategories();
};

const handleLimitChange = async (limit: 1 | 10 | 100 | 1000) => {
  itemsPerPage.value = limit;
  currentPage.value = 1;
  await loadCategories();
};

const viewCategoryDetail = async (id: number) => {
  await categoriesStore.fetchCategoryDetail(id);
  selectedCategory.value = categoriesStore.selectedCategory;
};
</script>

<template>
  <DashboardLayout>
    <div class="categories">
      <div class="page-header">
        <h2 class="page-title">Categories</h2>
        
        <div class="filters">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search categories..."
              class="form-control"
              @keyup.enter="handleSearch"
            />
            <button class="btn btn-primary" @click="handleSearch">Search</button>
          </div>
          
          <select 
            v-model="itemsPerPage" 
            class="form-control"
            @change="handleLimitChange(Number(($event.target as HTMLSelectElement).value) as 1 | 10 | 100 | 1000)"
          >
            <option :value="1">1 per page</option>
            <option :value="10">10 per page</option>
            <option :value="100">100 per page</option>
            <option :value="1000">1000 per page</option>
          </select>
        </div>
      </div>

      <div class="categories-list card" v-if="!categoriesStore.loading">
        <table class="categories-table">
          <thead>
            <tr>
              <th>
                <button class="sort-button" @click="handleSort('name')">
                  Name
                  <span v-if="sortBy === 'name'" class="sort-indicator">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </button>
              </th>
              <th>Description</th>
              <th>
                <button class="sort-button" @click="handleSort('createdAt')">
                  Created At
                  <span v-if="sortBy === 'createdAt'" class="sort-indicator">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categoriesStore.categories" :key="category.id">
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>{{ new Date(category.createdAt).toLocaleDateString() }}</td>
              <td>
                <button 
                  class="btn btn-primary btn-sm"
                  @click="viewCategoryDetail(category.id)"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination" v-if="categoriesStore.pagination">
          <button 
            v-for="page in categoriesStore.pagination.detail"
            :key="page"
            class="btn"
            :class="{ 'btn-primary': page === categoriesStore.pagination.current }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <div class="loading" v-else>
        Loading categories...
      </div>

      <!-- Category Detail Modal -->
      <div class="modal" v-if="selectedCategory" @click.self="selectedCategory = null">
        <div class="modal-content card">
          <h3>Category Details</h3>
          <div class="detail-group">
            <label>Name:</label>
            <p>{{ selectedCategory.name }}</p>
          </div>
          <div class="detail-group">
            <label>Description:</label>
            <p>{{ selectedCategory.description }}</p>
          </div>
          <div class="detail-group">
            <label>Created:</label>
            <p>{{ new Date(selectedCategory.createdAt).toLocaleString() }}</p>
          </div>
          <div class="detail-group">
            <label>Updated:</label>
            <p>{{ new Date(selectedCategory.updatedAt).toLocaleString() }}</p>
          </div>
          <button class="btn btn-primary" @click="selectedCategory = null">Close</button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.categories {
  padding: var(--space-4);
}

.page-header {
  margin-bottom: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-900);
}

.filters {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.search-box {
  display: flex;
  gap: var(--space-2);
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table th,
.categories-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-grey-200);
}

.categories-table th {
  font-weight: 600;
  color: var(--color-grey-700);
  background-color: var(--color-grey-100);
}

.sort-button {
  background: none;
  border: none;
  font-weight: 600;
  color: var(--color-grey-700);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.sort-button:hover {
  color: var(--color-primary);
}

.sort-indicator {
  color: var(--color-primary);
}

.btn-sm {
  padding: var(--space-1) var(--space-2);
  font-size: 0.875rem;
}

.pagination {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  margin-top: var(--space-4);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  padding: var(--space-4);
}

.detail-group {
  margin-bottom: var(--space-3);
}

.detail-group label {
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: var(--space-1);
  display: block;
}

.loading {
  text-align: center;
  padding: var(--space-4);
  color: var(--color-grey-600);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-box input {
    flex: 1;
  }
}
</style>