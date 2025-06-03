<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStockMovementsStore } from '@/stores/stockMovements';
import { useToast } from '@/composables/useToast';
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const store = useStockMovementsStore();
const { showToast } = useToast();

const search = ref('');
const movementType = ref('');
const sortBy = ref('date');
const sortOrder = ref('desc');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const handleSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  search.value = value;
  fetchData();
};

const handleMovementTypeChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  movementType.value = value;
  fetchData();
};

const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  fetchData();
};

const fetchData = async () => {
  try {
    await store.fetchStockMovements({
      search: search.value,
      movementType: movementType.value || undefined,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
      page: currentPage.value,
      limit: itemsPerPage.value,
    });
  } catch (error: any) {
    showToast('Error fetching stock movements', 'error');
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <DashboardLayout>
    <div class="stock-movements-container">
      <div class="header">
        <h1>Stock Movements</h1>
        <p class="subtitle">Track and manage inventory movements</p>
      </div>

      <div class="filters">
        <input
          type="text"
          v-model="search"
          placeholder="Search stock movements..."
          class="search-input"
          @input="handleSearch"
        />
        <select
          v-model="movementType"
          class="type-select"
          @change="handleMovementTypeChange"
        >
          <option value="">All Types</option>
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>
      </div>

      <div class="table-container">
        <table class="stock-table">
          <thead>
            <tr>
              <th @click="handleSort('productName')">
                Product Name
                <span class="sort-icon">↕</span>
              </th>
              <th @click="handleSort('quantity')">
                Quantity
                <span class="sort-icon">↕</span>
              </th>
              <th @click="handleSort('productSku')">
                SKU
                <span class="sort-icon">↕</span>
              </th>
              <th @click="handleSort('movementType')">
                Type
                <span class="sort-icon">↕</span>
              </th>
              <th @click="handleSort('storeName')">
                Store
                <span class="sort-icon">↕</span>
              </th>
              <th @click="handleSort('createdAt')">
                Date
                <span class="sort-icon">↕</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.stockMovements" :key="item.id">
              <td>{{ item.productName }}</td>
              <td :class="{ 'negative': item.movementType === 'out' }">
                {{ item.movementType === 'out' ? '-' : '+' }}{{ item.quantity }}
              </td>
              <td>{{ item.productSku }}</td>
              <td>
                <span :class="['status-badge', item.movementType === 'in' ? 'status-in' : 'status-out']">
                  {{ item.movementType === 'in' ? 'Stock In' : 'Stock Out' }}
                </span>
              </td>
              <td>{{ item.storeName }}</td>
              <td>{{ formatDate(item.createdAt) }}</td>
              <td class="actions">
                <button class="btn-action btn-view">View</button>
                <button class="btn-action btn-edit">Edit</button>
                <button class="btn-action btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.stock-movements-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-grey-900);
}

.subtitle {
  color: var(--color-grey-600);
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  max-width: 300px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.type-select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.763L10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.table-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.stock-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.stock-table th,
.stock-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-grey-200);
}

.stock-table th {
  background-color: var(--color-grey-50);
  font-weight: 600;
  color: var(--color-grey-700);
  cursor: pointer;
  user-select: none;
}

.stock-table th:hover {
  background-color: var(--color-grey-100);
}

.sort-icon {
  margin-left: 0.25rem;
  color: var(--color-grey-400);
}

.negative {
  color: var(--color-error-600);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-in {
  background-color: var(--color-success-50);
  color: var(--color-success-700);
}

.status-out {
  background-color: var(--color-error-50);
  color: var(--color-error-700);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-view {
  background-color: var(--color-primary);
  color: white;
}

.btn-edit {
  background-color: white;
  border: 1px solid var(--color-grey-200);
  color: var(--color-grey-700);
}

.btn-delete {
  background-color: var(--color-error-500);
  color: white;
}

.btn-view:hover {
  background-color: var(--color-primary-600);
}

.btn-edit:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-delete:hover {
  background-color: var(--color-error-600);
}
</style>
