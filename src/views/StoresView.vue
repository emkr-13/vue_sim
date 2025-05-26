<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStoresStore } from "@/stores/stores";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DataTable from "@/components/DataTable.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import StoreForm from "@/components/StoreForm.vue";
import Pagination from "@/components/Pagination.vue";
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

const tableColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description" },
  { key: "location", label: "Location" },
  { key: "manager", label: "Manager" },
  { key: "email", label: "Email" },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString(),
  },
];

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

      <div class="stores-list card">
        <DataTable
          :columns="tableColumns"
          :data="storesStore.stores"
          :loading="storesStore.loading"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @sort="handleSort"
          @view="viewStoreDetail"
          @edit="openEditModal"
          @delete="handleDelete"
        />

        <Pagination
          v-if="storesStore.pagination"
          :pagination="storesStore.pagination"
          @page-change="handlePageChange"
        />
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

.detail-group {
  margin-bottom: var(--space-3);
}

.detail-group label {
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: var(--space-1);
  display: block;
}

.store-details {
  padding: var(--space-2) 0;
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
