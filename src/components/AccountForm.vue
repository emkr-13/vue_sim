<script setup lang="ts">
import { ref, watch } from "vue";
import type { CreateAccountRequest, UpdateAccountRequest } from "@/types";

interface Props {
  initialData: CreateAccountRequest | UpdateAccountRequest;
  isEdit?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "submit", data: CreateAccountRequest | UpdateAccountRequest): void;
  (e: "cancel"): void;
}>();

const formData = ref<CreateAccountRequest | UpdateAccountRequest>({
  ...props.initialData,
});

watch(
  () => props.initialData,
  (newData) => {
    formData.value = { ...newData };
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
  <form @submit.prevent="handleSubmit" class="account-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="type">Type</label>
      <select id="type" v-model="formData.type" required class="form-input">
        <option value="customer">Customer</option>
        <option value="supplier">Supplier</option>
      </select>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="phone">Phone</label>
      <input
        type="tel"
        id="phone"
        v-model="formData.phone"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <textarea
        id="address"
        v-model="formData.address"
        required
        class="form-input"
        rows="3"
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
.account-form {
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

.form-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.cancel-btn,
.submit-btn {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background-color: white;
  border: 1px solid var(--color-grey-300);
  color: var(--color-grey-700);
}

.submit-btn {
  background-color: var(--color-primary-500);
  border: none;
  color: white;
}

.cancel-btn:hover {
  background-color: var(--color-grey-50);
}

.submit-btn:hover {
  background-color: var(--color-primary-600);
}
</style> 