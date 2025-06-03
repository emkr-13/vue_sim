<script setup lang="ts">
import type { Pagination } from '@/types';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: any) => string;
}

const props = defineProps<{
  columns: Column[];
  data: any[];
  loading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  pagination?: Pagination | null;
}>();

const emit = defineEmits<{
  (e: 'sort', column: string): void;
  (e: 'page-change', page: number): void;
  (e: 'view', item: any): void;
  (e: 'edit', item: any): void;
  (e: 'delete', item: any): void;
}>();

const formatValue = (item: any, column: Column) => {
  const value = item[column.key];
  if (column.formatter) {
    return column.formatter(value);
  }
  if (value instanceof Date) {
    return value.toLocaleString();
  }
  return value;
};

const getSortIcon = (column: string) => {
  if (props.sortBy !== column) return '↕';
  return props.sortOrder === 'asc' ? '↑' : '↓';
};

const handleSort = (column: string) => {
  emit('sort', column);
};

const handlePageChange = (page: number) => {
  emit('page-change', page);
};
</script>

<template>
  <div class="data-table-wrapper">
    <div v-if="loading" class="loading">Loading data...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" @click="handleSort(column.key)" :class="{ sortable: true, active: sortBy === column.key }">
            {{ column.label }}
            <span class="sort-icon">{{ getSortIcon(column.key) }}</span>
          </th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="columns.length" class="loading">Loading...</td>
          </tr>
        </template>
        <template v-else-if="data.length === 0">
          <tr>
            <td :colspan="columns.length" class="no-data">No data available</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in data" :key="index">
            <td v-for="column in columns" :key="column.key">
              <slot :name="'cell-' + column.key" :item="item">
                {{ formatValue(item, column) }}
              </slot>
            </td>
            <td>
              <div class="actions">
                <button
                  class="btn btn-primary btn-sm"
                  @click="emit('view', item)"
                >
                  View
                </button>
                <button
                  class="btn btn-outline btn-sm"
                  @click="emit('edit', item)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-error btn-sm"
                  @click="emit('delete', item)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div v-if="pagination" class="pagination">
      <button
        :disabled="pagination.currentPage === 1"
        @click="handlePageChange(pagination.currentPage - 1)"
        class="pagination-button"
      >
        Previous
      </button>
      <span class="pagination-info">
        Page {{ pagination.currentPage }} of {{ pagination.lastPage }}
      </span>
      <button
        :disabled="pagination.currentPage === pagination.lastPage"
        @click="handlePageChange(pagination.currentPage + 1)"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-grey-200);
}

.data-table th {
  font-weight: 600;
  color: var(--color-grey-700);
  background-color: var(--color-grey-100);
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable:hover {
  background-color: var(--color-grey-100);
}

.data-table th.active {
  color: var(--color-primary);
}

.sort-icon {
  margin-left: 0.5rem;
  color: var(--color-grey-400);
}

th.active .sort-icon {
  color: var(--color-primary);
}

.actions {
  display: flex;
  gap: var(--space-2);
}

.actions-column {
  width: 180px;
}

.btn-sm {
  padding: var(--space-1) var(--space-2);
  font-size: 0.875rem;
}

.loading,
.no-data {
  text-align: center;
  padding: var(--space-4);
  color: var(--color-grey-600);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: white;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: var(--color-grey-600);
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    gap: var(--space-1);
  }

  .actions-column {
    width: 100px;
  }
}
</style>
