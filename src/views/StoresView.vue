<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStoresStore } from "@/stores/stores";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
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

const handleSort = async (field: "name" | "createdAt") => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
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

const viewStoreDetail = async (id: number) => {
  await storesStore.fetchStoreDetail(id);
  selectedStore.value = storesStore.selectedStore;
};

const openCreateModal = () => {
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

const handleCreate = async () => {
  try {
    await storesStore.createStore(newStore.value);
    showCreateModal.value = false;
    newStore.value = {
      name: "",
      description: "",
      location: "",
      manager: "",
      email: "",
      address: "",
    };
    await loadStores();
  } catch (error) {
    console.error("Failed to create store:", error);
  }
};

const handleUpdate = async () => {
  try {
    await storesStore.updateStore(editStore.value);
    showEditModal.value = false;
    await loadStores();
  } catch (error) {
    console.error("Failed to update store:", error);
  }
};

const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this store?")) {
    try {
      await storesStore.deleteStore(id);
      await loadStores();
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="stores">
      <div class="page-header">
        <h2 class="page-title">Stores</h2>

        <div class="filters">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search stores..."
              class="form-control"
              @keyup.enter="handleSearch"
            />
            <button class="btn btn-primary" @click="handleSearch">
              Search
            </button>
          </div>

          <select
            v-model="itemsPerPage"
            class="form-control"
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
            <option :value="1">1 per page</option>
            <option :value="10">10 per page</option>
            <option :value="100">100 per page</option>
            <option :value="1000">1000 per page</option>
          </select>

          <button class="btn btn-primary" @click="openCreateModal">
            Add Store
          </button>
        </div>
      </div>

      <div class="stores-list card" v-if="!storesStore.loading">
        <table class="stores-table">
          <thead>
            <tr>
              <th>
                <button class="sort-button" @click="handleSort('name')">
                  Name
                  <span v-if="sortBy === 'name'" class="sort-indicator">
                    {{ sortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                </button>
              </th>
              <th>Description</th>
              <th>Location</th>
              <th>Manager</th>
              <th>Email</th>
              <th>
                <button class="sort-button" @click="handleSort('createdAt')">
                  Created At
                  <span v-if="sortBy === 'createdAt'" class="sort-indicator">
                    {{ sortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                </button>
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
              <td>
                <div class="actions">
                  <button
                    class="btn btn-primary btn-sm"
                    @click="viewStoreDetail(store.id)"
                  >
                    View
                  </button>
                  <button
                    class="btn btn-outline btn-sm"
                    @click="openEditModal(store)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-error btn-sm"
                    @click="handleDelete(store.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination" v-if="storesStore.pagination">
          <button
            v-for="page in storesStore.pagination.detail"
            :key="page"
            class="btn"
            :class="{ 'btn-primary': page === storesStore.pagination.current }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <div class="loading" v-else>Loading stores...</div>

      <!-- Create Store Modal -->
      <div
        class="modal"
        v-if="showCreateModal"
        @click.self="showCreateModal = false"
      >
        <div class="modal-content card">
          <h3>Create New Store</h3>
          <form @submit.prevent="handleCreate">
            <div class="form-group">
              <label>Name</label>
              <input v-model="newStore.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                v-model="newStore.description"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input
                v-model="newStore.location"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Manager</label>
              <input v-model="newStore.manager" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="newStore.email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea
                v-model="newStore.address"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="modal-actions">
              <button
                type="button"
                class="btn"
                @click="showCreateModal = false"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit Store Modal -->
      <div
        class="modal"
        v-if="showEditModal"
        @click.self="showEditModal = false"
      >
        <div class="modal-content card">
          <h3>Edit Store</h3>
          <form @submit.prevent="handleUpdate">
            <div class="form-group">
              <label>Name</label>
              <input v-model="editStore.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                v-model="editStore.description"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input
                v-model="editStore.location"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Manager</label>
              <input
                v-model="editStore.manager"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="editStore.email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea
                v-model="editStore.address"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn" @click="showEditModal = false">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Store Detail Modal -->
      <div
        class="modal"
        v-if="selectedStore"
        @click.self="selectedStore = null"
      >
        <div class="modal-content card">
          <h3>Store Details</h3>
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
          <button class="btn btn-primary" @click="selectedStore = null">
            Close
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.stores {
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

.stores-table {
  width: 100%;
  border-collapse: collapse;
}

.stores-table th,
.stores-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-grey-200);
}

.stores-table th {
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

.btn-sm {
  padding: var(--space-1) var(--space-2);
  font-size: 0.875rem;
}

.btn-error {
  background-color: var(--color-error);
  color: white;
}

.btn-error:hover {
  background-color: color-mix(in srgb, var(--color-error) 80%, black);
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
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

  .actions {
    flex-direction: column;
  }
}
</style>
