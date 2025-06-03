<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

const props = defineProps<{
  modelValue: string;
  options: Option[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <select
    :value="modelValue"
    class="select-input"
    @change="handleChange"
  >
    <option v-if="placeholder" value="" disabled selected>
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.select-input {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  background-color: white;
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.763L10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.select-input:focus {
  border-color: var(--color-primary);
}

.select-input option {
  padding: 0.5rem;
}
</style> 