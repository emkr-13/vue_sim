<script setup lang="ts">
import { ref, watch } from "vue";
import type { CreateStoreRequest, UpdateStoreRequest } from "@/types";

interface Props {
  store?: UpdateStoreRequest;
  isEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
});

const emit = defineEmits<{
  (e: "submit", data: CreateStoreRequest | UpdateStoreRequest): void;
  (e: "cancel"): void;
}>();

const formData = ref<CreateStoreRequest | UpdateStoreRequest>(
  props.isEdit
    ? {
        id: props.store?.id || 0,
        name: props.store?.name || "",
        description: props.store?.description || "",
        location: props.store?.location || "",
        manager: props.store?.manager || "",
        email: props.store?.email || "",
        address: props.store?.address || "",
      }
    : {
        name: "",
        description: "",
        location: "",
        manager: "",
        email: "",
        address: "",
      }
);

watch(
  () => props.store,
  (newStore) => {
    if (newStore && props.isEdit) {
      formData.value = { ...newStore };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (props.isEdit) {
    emit("submit", formData.value as UpdateStoreRequest);
  } else {
    emit("submit", formData.value as CreateStoreRequest);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="store-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="formData.name"
        class="form-control"
        required
        placeholder="Store name"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-control"
        required
        placeholder="Store description"
        rows="3"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="location">Location</label>
        <input
          id="location"
          v-model="formData.location"
          class="form-control"
          required
          placeholder="Store location"
        />
      </div>

      <div class="form-group">
        <label for="manager">Manager</label>
        <input
          id="manager"
          v-model="formData.manager"
          class="form-control"
          required
          placeholder="Store manager"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="formData.email"
        class="form-control"
        required
        placeholder="Store email"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <textarea
        id="address"
        v-model="formData.address"
        class="form-control"
        required
        placeholder="Store address"
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
.store-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-row {
  display: flex;
  gap: var(--space-3);
}

.form-row .form-group {
  flex: 1;
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

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
