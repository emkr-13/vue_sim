<script setup lang="ts">
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: any) => string;
}

interface Props {
  columns: Column[];
  data: any[];
  loading?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "sort", key: string): void;
  (e: "view", item: any): void;
  (e: "edit", item: any): void;
  (e: "delete", item: any): void;
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

const getSortIndicator = (column: Column) => {
  if (!column.sortable || props.sortBy !== column.key) return "";
  return props.sortOrder === "asc" ? "↑" : "↓";
};

const handleSort = (column: Column) => {
  if (column.sortable) {
    emit("sort", column.key);
  }
};
</script>

<template>
  <div class="data-table-wrapper">
    <div v-if="loading" class="loading">Loading data...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            <button
              v-if="column.sortable"
              class="sort-button"
              @click="handleSort(column)"
            >
              {{ column.label }}
              <span v-if="sortBy === column.key" class="sort-indicator">
                {{ getSortIndicator(column) }}
              </span>
            </button>
            <span v-else>{{ column.label }}</span>
          </th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-for="column in columns" :key="column.key">
            {{ formatValue(item, column) }}
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
      </tbody>
    </table>
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

.loading {
  text-align: center;
  padding: var(--space-4);
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
