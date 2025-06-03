<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
}>();

const searchQuery = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue;
});

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue);
});

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <div class="search-input">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder || 'Search...'"
      @keyup.enter="handleSearch"
    >
    <button @click="handleSearch" class="search-button">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<style scoped>
.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 300px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: var(--color-primary);
}

.search-button {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--color-grey-500);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  color: var(--color-primary);
}
</style> 