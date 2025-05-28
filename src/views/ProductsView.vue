<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import ProductForm from "@/components/ProductForm.vue";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

const productsStore = useProductsStore();
const currentPage = ref(1);
const itemsPerPage = ref<1 | 10 | 100 | 1000>(10);
const searchQuery = ref("");
const sortBy = ref<"name" | "createdAt">("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");
const selectedProduct = ref<Product | null>(null);
const showDetailModal = ref(false);
const showCreateModal = ref(false);
const showEditModal = ref(false);

const newProduct = ref<CreateProductRequest>({
  name: "",
  categoryId: "",
  price: 0,
  satuan: "",
  description: "",
});

const editProduct = ref<UpdateProductRequest>({
  id: "",
  name: "",
  categoryId: "",
  price: 0,
  satuan: "",
  description: "",
});

onMounted(() => {
  loadProducts();
});

const loadProducts = async () => {
  await productsStore.fetchProducts({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: searchQuery.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

const handleSearch = async () => {
  currentPage.value = 1;
  await loadProducts();
};

const handleSort = async (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field as "name" | "createdAt";
    sortOrder.value = "asc";
  }
  await loadProducts();
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await loadProducts();
};

const handleLimitChange = async (limit: 1 | 10 | 100 | 1000) => {
  itemsPerPage.value = limit;
  currentPage.value = 1;
  await loadProducts();
};

const viewProductDetail = async (product: Product) => {
  selectedProduct.value = product;
  showDetailModal.value = true;
};

const openCreateModal = () => {
  newProduct.value = {
    name: "",
    categoryId: "",
    price: 0,
    satuan: "",
    description: "",
  };
  showCreateModal.value = true;
};

const openEditModal = (product: Product) => {
  editProduct.value = {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    price: parseInt(product.price_sell),
    satuan: product.satuan,
    description: product.description,
  };
  showEditModal.value = true;
};

const handleCreate = async (data: CreateProductRequest) => {
  try {
    await productsStore.createProduct(data);
    showCreateModal.value = false;
    await loadProducts();
  } catch (error) {
    console.error("Failed to create product:", error);
  }
};

const handleUpdate = async (
  data: UpdateProductRequest | CreateProductRequest
) => {
  try {
    await productsStore.updateProduct(data as UpdateProductRequest);
    showEditModal.value = false;
    await loadProducts();
  } catch (error) {
    console.error("Failed to update product:", error);
  }
};

const handleDelete = async (product: Product) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await productsStore.deleteProduct(product.id);
      await loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="products-container">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <div class="menu-icon">
          <i class="fas fa-bars"></i>
          <span>Products</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="products-content">
        <h2 class="section-title">Products</h2>

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
              Add Product
            </button>
          </div>
        </div>

        <!-- Products Table -->
        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th @click="handleSort('name')" class="sortable">
                  Name
                  <span v-if="sortBy === 'name'" class="sort-icon">
                    {{ sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </th>
                <th>Category</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Unit</th>
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
              <tr v-for="product in productsStore.products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.categoryName }}</td>
                <td>{{ product.sku }}</td>
                <td>{{ product.price_sell }}</td>
                <td>{{ product.satuan }}</td>
                <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
                <td class="actions-cell">
                  <button class="view-btn" @click="viewProductDetail(product)">
                    View
                  </button>
                  <button class="edit-btn" @click="openEditModal(product)">
                    Edit
                  </button>
                  <button class="delete-btn" @click="handleDelete(product)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" v-if="productsStore.pagination">
          <button
            class="pagination-btn"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            « Prev
          </button>

          <button
            v-for="page in productsStore.pagination?.detail"
            :key="page"
            class="pagination-btn"
            :class="{ active: currentPage === page }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination-btn"
            :disabled="productsStore.pagination?.last_page"
            @click="handlePageChange(currentPage + 1)"
          >
            Next »
          </button>
        </div>
      </div>
    </div>

    <!-- Create Product Modal -->
    <ModalDialog
      :show="showCreateModal"
      title="Add New Product"
      @close="showCreateModal = false"
    >
      <ProductForm
        :initial-data="newProduct"
        @submit="handleCreate"
        @cancel="showCreateModal = false"
      />
    </ModalDialog>

    <!-- Edit Product Modal -->
    <ModalDialog
      :show="showEditModal"
      title="Edit Product"
      @close="showEditModal = false"
    >
      <ProductForm
        :initial-data="editProduct"
        :is-edit="true"
        @submit="handleUpdate"
        @cancel="showEditModal = false"
      />
    </ModalDialog>

    <!-- Product Detail Modal -->
    <ModalDialog
      :show="showDetailModal"
      title="Product Details"
      @close="showDetailModal = false"
    >
      <div v-if="selectedProduct" class="product-details">
        <div class="detail-row">
          <strong>Name:</strong>
          <span>{{ selectedProduct.name }}</span>
        </div>
        <div class="detail-row">
          <strong>Category:</strong>
          <span>{{ selectedProduct.categoryName }}</span>
        </div>
        <div class="detail-row">
          <strong>SKU:</strong>
          <span>{{ selectedProduct.sku }}</span>
        </div>
        <div class="detail-row">
          <strong>Selling Price:</strong>
          <span>{{ selectedProduct.price_sell }}</span>
        </div>
        <div class="detail-row">
          <strong>Cost Price:</strong>
          <span>{{ selectedProduct.price_cost }}</span>
        </div>
        <div class="detail-row">
          <strong>Unit:</strong>
          <span>{{ selectedProduct.satuan }}</span>
        </div>
        <div class="detail-row">
          <strong>Description:</strong>
          <span>{{ selectedProduct.description }}</span>
        </div>
        <div class="detail-row">
          <strong>Created:</strong>
          <span>{{
            new Date(selectedProduct.createdAt).toLocaleString()
          }}</span>
        </div>
        <div class="detail-row">
          <strong>Updated:</strong>
          <span>{{
            new Date(selectedProduct.updatedAt).toLocaleString()
          }}</span>
        </div>
      </div>
    </ModalDialog>
  </DashboardLayout>
</template>

<style scoped>
.products-container {
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

.products-content {
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

.search-input {
  width: 300px;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
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

.products-table {
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

.product-details {
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
</style>
