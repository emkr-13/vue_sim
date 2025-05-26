<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import CategoryForm from "@/components/CategoryForm.vue";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";

const categoriesStore = useCategoriesStore();
const currentPage = ref(1);
const itemsPerPage = ref<1 | 10 | 100 | 1000>(10);
const searchQuery = ref("");
const sortBy = ref<"name" | "createdAt">("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");
const selectedCategory = ref<Category | null>(null);
const showDetailModal = ref(false);
const showCreateModal = ref(false);
const showEditModal = ref(false);

const newCategory = ref<CreateCategoryRequest>({
  name: "",
  description: "",
});

const editCategory = ref<UpdateCategoryRequest>({
  id: 0,
  name: "",
  description: "",
});

// Removed unused tableColumns declaration

onMounted(() => {
  loadCategories();
});

const loadCategories = async () => {
  await categoriesStore.fetchCategories({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: searchQuery.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

const handleSearch = async () => {
  currentPage.value = 1;
  await loadCategories();
};

const handleSort = async (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field as "name" | "createdAt";
    sortOrder.value = "asc";
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

const viewCategoryDetail = async (category: Category) => {
  selectedCategory.value = category;
  showDetailModal.value = true;
};

const openCreateModal = () => {
  newCategory.value = {
    name: "",
    description: "",
  };
  showCreateModal.value = true;
};

const openEditModal = (category: Category) => {
  editCategory.value = {
    id: category.id,
    name: category.name,
    description: category.description,
  };
  showEditModal.value = true;
};

const handleCreate = async (data: CreateCategoryRequest) => {
  try {
    await categoriesStore.createCategory(data);
    showCreateModal.value = false;
    await loadCategories();
  } catch (error) {
    console.error("Failed to create category:", error);
  }
};

const handleUpdate = async (
  data: UpdateCategoryRequest | CreateCategoryRequest
) => {
  try {
    await categoriesStore.updateCategory(data as UpdateCategoryRequest);
    showEditModal.value = false;
    await loadCategories();
  } catch (error) {
    console.error("Failed to update category:", error);
  }
};

const handleDelete = async (category: Category) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await categoriesStore.deleteCategory(category.id);
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="categories-container">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <div class="menu-icon">
          <i class="fas fa-bars"></i>
          <span>Categories</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="categories-content">
        <h2 class="section-title">Categories</h2>

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
              Add Category
            </button>
          </div>
        </div>

        <!-- Categories Table -->
        <div class="categories-table">
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
              <tr
                v-for="category in categoriesStore.categories"
                :key="category.id"
              >
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>{{ new Date(category.createdAt).toLocaleDateString() }}</td>
                <td class="actions-cell">
                  <button
                    class="view-btn"
                    @click="viewCategoryDetail(category)"
                  >
                    View
                  </button>
                  <button class="edit-btn" @click="openEditModal(category)">
                    Edit
                  </button>
                  <button class="delete-btn" @click="handleDelete(category)">
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
              !categoriesStore.pagination ||
              currentPage >= categoriesStore.pagination.total_page
            "
          >
            Next »
          </button>
        </div>
      </div>

      <!-- Create Category Modal -->
      <ModalDialog
        :show="showCreateModal"
        title="Create New Category"
        @close="showCreateModal = false"
      >
        <CategoryForm
          @submit="handleCreate"
          @cancel="showCreateModal = false"
        />
      </ModalDialog>

      <!-- Edit Category Modal -->
      <ModalDialog
        :show="showEditModal"
        title="Edit Category"
        @close="showEditModal = false"
      >
        <CategoryForm
          :category="editCategory"
          :is-edit="true"
          @submit="handleUpdate"
          @cancel="showEditModal = false"
        />
      </ModalDialog>

      <!-- Category Detail Modal -->
      <ModalDialog
        :show="showDetailModal"
        title="Category Details"
        @close="showDetailModal = false"
      >
        <div v-if="selectedCategory" class="category-details">
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
.categories-container {
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

.categories-content {
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

.categories-table {
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
  margin-bottom: var(--space-3);
}

.detail-group label {
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.25rem;
  display: block;
}

.category-details {
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
