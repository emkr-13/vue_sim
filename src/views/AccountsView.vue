<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAccountsStore } from "@/stores/accounts";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import AccountForm from "@/components/AccountForm.vue";
import type { Account, CreateAccountRequest, UpdateAccountRequest } from "@/types";

const accountsStore = useAccountsStore();
const currentPage = ref(1);
const itemsPerPage = ref<1 | 10 | 100 | 1000>(10);
const searchQuery = ref("");
const sortBy = ref<"name" | "createdAt">("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");
const selectedAccount = ref<Account | null>(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const accountType = ref<"supplier" | "customer" | undefined>(undefined);

const newAccount = ref<CreateAccountRequest>({
  name: "",
  type: "customer",
  email: "",
  phone: "",
  address: "",
});

const editAccount = ref<UpdateAccountRequest>({
  id: 0,
  name: "",
  type: "customer",
  email: "",
  phone: "",
  address: "",
});

onMounted(() => {
  loadAccounts();
});

const loadAccounts = async () => {
  await accountsStore.fetchAccounts({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: searchQuery.value || undefined,
    type: accountType.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

const handleSearch = async () => {
  currentPage.value = 1;
  await loadAccounts();
};

const handleSort = async (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field as "name" | "createdAt";
    sortOrder.value = "asc";
  }
  await loadAccounts();
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await loadAccounts();
};

const handleLimitChange = async (limit: 1 | 10 | 100 | 1000) => {
  itemsPerPage.value = limit;
  currentPage.value = 1;
  await loadAccounts();
};

const handleTypeChange = async (type: "supplier" | "customer" | "") => {
  accountType.value = type === "" ? undefined : (type as "supplier" | "customer");
  currentPage.value = 1;
  await loadAccounts();
};

const viewAccountDetail = async (account: Account) => {
  selectedAccount.value = account;
  showDetailModal.value = true;
};

const openCreateModal = () => {
  newAccount.value = {
    name: "",
    type: "customer",
    email: "",
    phone: "",
    address: "",
  };
  showCreateModal.value = true;
};

const openEditModal = (account: Account) => {
  editAccount.value = {
    id: account.id,
    name: account.name,
    type: account.type,
    email: account.email,
    phone: account.phone,
    address: account.address,
  };
  showEditModal.value = true;
};

const handleCreate = async (data: CreateAccountRequest) => {
  try {
    await accountsStore.createAccount(data);
    showCreateModal.value = false;
    await loadAccounts();
  } catch (error) {
    console.error("Failed to create account:", error);
  }
};

const handleUpdate = async (data: UpdateAccountRequest) => {
  try {
    await accountsStore.updateAccount(data);
    showEditModal.value = false;
    await loadAccounts();
  } catch (error) {
    console.error("Failed to update account:", error);
  }
};

const handleDelete = async (account: Account) => {
  if (confirm("Are you sure you want to delete this account?")) {
    try {
      await accountsStore.deleteAccount(account.id);
      await loadAccounts();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="accounts-container">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <div class="menu-icon">
          <i class="fas fa-bars"></i>
          <span>Accounts</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="accounts-content">
        <h2 class="section-title">Accounts</h2>

        <!-- Search and Actions Bar -->
        <div class="action-bar">
          <div class="search-wrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              class="search-input"
            />
            <select
              v-model="accountType"
              class="type-filter"
              @change="handleTypeChange($event.target.value)"
            >
              <option value="">All Types</option>
              <option value="customer">Customers</option>
              <option value="supplier">Suppliers</option>
            </select>
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
              Add Account
            </button>
          </div>
        </div>

        <!-- Accounts Table -->
        <div class="accounts-table">
          <table>
            <thead>
              <tr>
                <th @click="handleSort('name')" class="sortable">
                  Name
                  <span v-if="sortBy === 'name'" class="sort-icon">
                    {{ sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
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
              <tr v-for="account in accountsStore.accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.type }}</td>
                <td>{{ account.email }}</td>
                <td>{{ account.phone }}</td>
                <td>{{ new Date(account.createdAt).toLocaleDateString() }}</td>
                <td class="actions-cell">
                  <button class="view-btn" @click="viewAccountDetail(account)">
                    View
                  </button>
                  <button class="edit-btn" @click="openEditModal(account)">
                    Edit
                  </button>
                  <button class="delete-btn" @click="handleDelete(account)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" v-if="accountsStore.pagination">
          <button
            class="pagination-btn"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            « Prev
          </button>

          <button
            v-for="page in accountsStore.pagination?.detail"
            :key="page"
            class="pagination-btn"
            :class="{ active: currentPage === page }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination-btn"
            :disabled="accountsStore.pagination?.last_page"
            @click="handlePageChange(currentPage + 1)"
          >
            Next »
          </button>
        </div>
      </div>
    </div>

    <!-- Create Account Modal -->
    <ModalDialog
      :show="showCreateModal"
      title="Add New Account"
      @close="showCreateModal = false"
    >
      <AccountForm
        :initial-data="newAccount"
        @submit="handleCreate"
        @cancel="showCreateModal = false"
      />
    </ModalDialog>

    <!-- Edit Account Modal -->
    <ModalDialog
      :show="showEditModal"
      title="Edit Account"
      @close="showEditModal = false"
    >
      <AccountForm
        :initial-data="editAccount"
        :is-edit="true"
        @submit="handleUpdate"
        @cancel="showEditModal = false"
      />
    </ModalDialog>

    <!-- Account Detail Modal -->
    <ModalDialog
      :show="showDetailModal"
      title="Account Details"
      @close="showDetailModal = false"
    >
      <div v-if="selectedAccount" class="account-details">
        <div class="detail-row">
          <strong>Name:</strong>
          <span>{{ selectedAccount.name }}</span>
        </div>
        <div class="detail-row">
          <strong>Type:</strong>
          <span>{{ selectedAccount.type }}</span>
        </div>
        <div class="detail-row">
          <strong>Email:</strong>
          <span>{{ selectedAccount.email }}</span>
        </div>
        <div class="detail-row">
          <strong>Phone:</strong>
          <span>{{ selectedAccount.phone }}</span>
        </div>
        <div class="detail-row">
          <strong>Address:</strong>
          <span>{{ selectedAccount.address }}</span>
        </div>
        <div class="detail-row">
          <strong>Created:</strong>
          <span>{{ new Date(selectedAccount.createdAt).toLocaleString() }}</span>
        </div>
        <div class="detail-row">
          <strong>Updated:</strong>
          <span>{{ new Date(selectedAccount.updatedAt).toLocaleString() }}</span>
        </div>
      </div>
    </ModalDialog>
  </DashboardLayout>
</template>

<style scoped>
.accounts-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top-nav {
  padding: var(--space-4);
  background-color: white;
  border-bottom: 1px solid var(--color-grey-200);
}

.menu-icon {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  color: var(--color-grey-800);
}

.accounts-content {
  flex: 1;
  padding: var(--space-4);
  background-color: var(--color-grey-50);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--space-6);
  color: var(--color-grey-900);
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.search-wrapper {
  display: flex;
  gap: var(--space-2);
}

.search-input,
.type-filter {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
}

.search-input {
  width: 300px;
}

.type-filter {
  width: 150px;
}

.search-button {
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.action-right {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.items-per-page {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
}

.add-button {
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.accounts-table {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-4);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-grey-200);
  text-align: left;
}

th {
  background-color: var(--color-grey-100);
  font-weight: 600;
  color: var(--color-grey-700);
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  color: var(--color-primary-500);
}

.sort-icon {
  margin-left: var(--space-1);
  color: var(--color-primary-500);
}

.actions-cell {
  display: flex;
  gap: var(--space-2);
}

.view-btn,
.edit-btn,
.delete-btn {
  padding: var(--space-1) var(--space-2);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
}

.view-btn {
  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
}

.edit-btn {
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
}

.delete-btn {
  background-color: var(--color-red-100);
  color: var(--color-red-700);
}

.view-btn:hover {
  background-color: var(--color-blue-200);
}

.edit-btn:hover {
  background-color: var(--color-yellow-200);
}

.delete-btn:hover {
  background-color: var(--color-red-200);
}

.pagination-container {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  margin-top: var(--space-4);
}

.pagination-btn {
  padding: var(--space-2) var(--space-3);
  background-color: white;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: var(--color-grey-700);
}

.pagination-btn.active {
  background-color: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.account-details {
  padding: var(--space-4);
}

.detail-row {
  display: flex;
  margin-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-grey-100);
  padding-bottom: var(--space-2);
}

.detail-row strong {
  min-width: 120px;
  font-weight: 600;
  color: var(--color-grey-700);
}

@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper {
    width: 100%;
    margin-bottom: var(--space-3);
  }

  .action-right {
    width: 100%;
    justify-content: space-between;
  }

  .search-input,
  .type-filter {
    width: 100%;
  }
}
</style>
