<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStoresStore } from "@/stores/stores";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import StoreForm from "@/components/StoreForm.vue";
import type { Store, CreateStoreRequest, UpdateStoreRequest } from "@/types";

const storesStore = useStoresStore();
const currentPage = ref(1);
const itemsPerPage = ref<1 | 10 | 100 | 1000>(10);
const searchQuery = ref("");
const sortBy = ref<"name" | "createdAt">("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");
const selectedStore = ref<Store | null>(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);

const newStore = ref<CreateStoreRequest>({
  name: "",
  description: "",
  location: "",
  manager: "",
  email: "",
  address: "",
});

const editStore = ref<UpdateStoreRequest>({
  id: 0,
  name: "",
  description: "",
  location: "",
  manager: "",
  email: "",
  address: "",
});

onMounted(() => {
  loadStores();
});

const loadStores = async () => {
  await storesStore.fetchStores({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: searchQuery.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

const handleSearch = async () => {
  currentPage.value = 1;
  await loadStores();
};

const handleSort = async (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field as "name" | "createdAt";
    sortOrder.value = "asc";
  }
  await loadStores();
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await loadStores();
};

const handleLimitChange = async (limit: 1 | 10 | 100 | 1000) => {
  itemsPerPage.value = limit;
  currentPage.value = 1;
  await loadStores();
};

const viewStoreDetail = async (store: Store) => {
  selectedStore.value = store;
  showDetailModal.value = true;
};

const openCreateModal = () => {
  newStore.value = {
    name: "",
    description: "",
    location: "",
    manager: "",
    email: "",
    address: "",
  };
  showCreateModal.value = true;
};

const openEditModal = (store: Store) => {
  editStore.value = {
    id: store.id,
    name: store.name,
    description: store.description,
    location: store.location,
    manager: store.manager,
    email: store.email,
    address: store.address,
  };
  showEditModal.value = true;
};

const handleCreate = async (data: CreateStoreRequest) => {
  try {
    await storesStore.createStore(data);
    showCreateModal.value = false;
    await loadStores();
  } catch (error) {
    console.error("Failed to create store:", error);
  }
};

const handleUpdate = async (data: UpdateStoreRequest | CreateStoreRequest) => {
  try {
    await storesStore.updateStore(data as UpdateStoreRequest);
    showEditModal.value = false;
    await loadStores();
  } catch (error) {
    console.error("Failed to update store:", error);
  }
};

const handleDelete = async (store: Store) => {
  if (confirm("Are you sure you want to delete this store?")) {
    try {
      await storesStore.deleteStore(store.id);
      await loadStores();
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="stores-container">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <div class="menu-icon">
          <i class="fas fa-bars"></i>
          <span>Stores</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="stores-content">
        <h2 class="section-title">Stores</h2>

        <!-- Search and Actions Bar -->
        <div class="action-bar">
          <div class="search-wrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              class="search-input"
            />
            <button class="search-button" @click="handleSearch">Search</button>
          </div>

          <div class="action-right">
            <select
              v-model="itemsPerPage"
              class="items-per-page"
              @change="
                handleLimitChange(
                  Number(($event.target as HTMLSelectElement).value) as
                    | 1
                    | 10
                    | 100
                    | 1000
                )
              "
            >
              <option :value="10">10 per page</option>
              <option :value="20">20 per page</option>
              <option :value="50">50 per page</option>
              <option :value="100">100 per page</option>
            </select>

            <button class="add-button" @click="openCreateModal">
              Add Store
            </button>
          </div>
        </div>

        <!-- Stores Table -->
        <div class="stores-table">
          <table>
            <thead>
              <tr>
                <th @click="handleSort('name')" class="sortable">
                  Name
                  <span v-if="sortBy === 'name'" class="sort-icon">
                    {{ sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </th>
                <th>Description</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Email</th>
                <th @click="handleSort('createdAt')" class="sortable">
                  Created At
                  <span v-if="sortBy === 'createdAt'" class="sort-icon">
                    {{ sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="store in storesStore.stores" :key="store.id">
                <td>{{ store.name }}</td>
                <td>{{ store.description }}</td>
                <td>{{ store.location }}</td>
                <td>{{ store.manager }}</td>
                <td>{{ store.email }}</td>
                <td>{{ new Date(store.createdAt).toLocaleDateString() }}</td>
                <td class="actions-cell">
                  <button class="view-btn" @click="viewStoreDetail(store)">
                    View
                  </button>
                  <button class="edit-btn" @click="openEditModal(store)">
                    Edit
                  </button>
                  <button class="delete-btn" @click="handleDelete(store)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
          <button
            class="pagination-btn"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            « Prev
          </button>

          <button
            class="pagination-btn"
            :class="{ active: currentPage === 1 }"
            @click="handlePageChange(1)"
          >
            1
          </button>

          <button
            class="pagination-btn"
            :class="{ active: currentPage === 2 }"
            @click="handlePageChange(2)"
          >
            2
          </button>

          <button
            class="pagination-btn"
            @click="handlePageChange(currentPage + 1)"
            :disabled="
              !storesStore.pagination ||
              currentPage >= storesStore.pagination.total_page
            "
          >
            Next »
          </button>
        </div>
      </div>

      <!-- Create Store Modal -->
      <ModalDialog
        :show="showCreateModal"
        title="Create New Store"
        @close="showCreateModal = false"
      >
        <StoreForm @submit="handleCreate" @cancel="showCreateModal = false" />
      </ModalDialog>

      <!-- Edit Store Modal -->
      <ModalDialog
        :show="showEditModal"
        title="Edit Store"
        @close="showEditModal = false"
      >
        <StoreForm
          :store="editStore"
          :is-edit="true"
          @submit="handleUpdate"
          @cancel="showEditModal = false"
        />
      </ModalDialog>

      <!-- Store Detail Modal -->
      <ModalDialog
        :show="showDetailModal"
        title="Store Details"
        @close="showDetailModal = false"
      >
        <div v-if="selectedStore" class="store-details">
          <div class="detail-group">
            <label>Name:</label>
            <p>{{ selectedStore.name }}</p>
          </div>
          <div class="detail-group">
            <label>Description:</label>
            <p>{{ selectedStore.description }}</p>
          </div>
          <div class="detail-group">
            <label>Location:</label>
            <p>{{ selectedStore.location }}</p>
          </div>
          <div class="detail-group">
            <label>Manager:</label>
            <p>{{ selectedStore.manager }}</p>
          </div>
          <div class="detail-group">
            <label>Email:</label>
            <p>{{ selectedStore.email }}</p>
          </div>
          <div class="detail-group">
            <label>Address:</label>
            <p>{{ selectedStore.address }}</p>
          </div>
          <div class="detail-group">
            <label>Created:</label>
            <p>{{ new Date(selectedStore.createdAt).toLocaleString() }}</p>
          </div>
          <div class="detail-group">
            <label>Updated:</label>
            <p>{{ new Date(selectedStore.updatedAt).toLocaleString() }}</p>
          </div>
        </div>
        <template #footer>
          <button class="btn btn-primary" @click="showDetailModal = false">
            Close
          </button>
        </template>
      </ModalDialog>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.stores-container {
  width: 100%;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.top-nav {
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.menu-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.stores-content {
  padding: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-wrapper {
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  width: 300px;
  background-color: #fff;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
}

.search-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #4338ca;
}

.action-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.items-per-page {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #fff;
}

.add-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #4338ca;
}

.stores-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f9fafb;
}

th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  background-color: #f3f4f6;
}

.sort-icon {
  margin-left: 0.25rem;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.view-btn,
.edit-btn,
.delete-btn {
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.view-btn {
  background-color: #3b82f6;
  color: white;
}

.edit-btn {
  background-color: #10b981;
  color: white;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.pagination-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-group {
  margin-bottom: 1rem;
}

.detail-group label {
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.25rem;
  display: block;
}

.store-details {
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper {
    width: 100%;
  }

  .action-right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
