<script setup lang="ts">
import { ref, watch } from "vue";
import type { CreateProductRequest, UpdateProductRequest } from "@/types";

const props = defineProps<{
  initialData?: CreateProductRequest | UpdateProductRequest;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateProductRequest | UpdateProductRequest): void;
  (e: "cancel"): void;
}>();

const formData = ref<CreateProductRequest | UpdateProductRequest>({
  name: "",
  categoryId: "",
  price: 0,
  satuan: "",
  description: "",
});

// If editing, include the id
if (props.isEdit && props.initialData && "id" in props.initialData) {
  formData.value = { ...props.initialData };
}

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    }
  }
);

const handleSubmit = () => {
  emit("submit", formData.value);
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category ID</label>
      <input
        type="text"
        id="categoryId"
        v-model="formData.categoryId"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        v-model.number="formData.price"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="satuan">Unit</label>
      <input
        type="text"
        id="satuan"
        v-model="formData.satuan"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-control"
        rows="4"
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="button" class="cancel-btn" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="submit-btn">
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.product-form {
  padding: var(--space-4);
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  color: var(--color-grey-700);
}

.form-control {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

textarea.form-control {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.cancel-btn {
  padding: var(--space-2) var(--space-4);
  background-color: white;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-700);
  cursor: pointer;
  font-weight: 500;
}

.submit-btn {
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-500);
  border: none;
  border-radius: var(--border-radius-sm);
  color: white;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn:hover {
  background-color: var(--color-grey-100);
}

.submit-btn:hover {
  background-color: var(--color-primary-600);
}
</style>
