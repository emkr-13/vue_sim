<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DataTable from "@/components/DataTable.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import CategoryForm from "@/components/CategoryForm.vue";
import Pagination from "@/components/Pagination.vue";
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

const tableColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description" },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    formatter: (value: string) => new Date(value).toLocaleDateString(),
  },
];

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
            Add Category
          </button>
        </div>
      </div>

      <div class="categories-list card">
        <DataTable
          :columns="tableColumns"
          :data="categoriesStore.categories"
          :loading="categoriesStore.loading"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @sort="handleSort"
          @view="viewCategoryDetail"
          @edit="openEditModal"
          @delete="handleDelete"
        />

        <Pagination
          v-if="categoriesStore.pagination"
          :pagination="categoriesStore.pagination"
          @page-change="handlePageChange"
        />
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

.detail-group {
  margin-bottom: var(--space-3);
}

.detail-group label {
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: var(--space-1);
  display: block;
}

.category-details {
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
