<script setup lang="ts">
import { ref, watch } from "vue";
import type { CreateCategoryRequest, UpdateCategoryRequest } from "@/types";

interface Props {
  category?: UpdateCategoryRequest;
  isEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
});

const emit = defineEmits<{
  (e: "submit", data: CreateCategoryRequest | UpdateCategoryRequest): void;
  (e: "cancel"): void;
}>();

const formData = ref<CreateCategoryRequest | UpdateCategoryRequest>(
  props.isEdit
    ? {
        id: props.category?.id || 0,
        name: props.category?.name || "",
        description: props.category?.description || "",
      }
    : {
        name: "",
        description: "",
      }
);

watch(
  () => props.category,
  (newCategory) => {
    if (newCategory && props.isEdit) {
      formData.value = { ...newCategory };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (props.isEdit) {
    emit("submit", formData.value as UpdateCategoryRequest);
  } else {
    emit("submit", formData.value as CreateCategoryRequest);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="category-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="formData.name"
        class="form-control"
        required
        placeholder="Category name"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-control"
        required
        placeholder="Category description"
        rows="3"
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="button" class="btn" @click="emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.category-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

label {
  font-weight: 500;
  color: var(--color-grey-700);
}

.form-control {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius);
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
</style>
