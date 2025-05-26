<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface Props {
  show: boolean;
  title: string;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.show) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-container" :class="`modal-${size}`">
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button class="modal-close" @click="emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-sm {
  max-width: 400px;
}

.modal-md {
  max-width: 600px;
}

.modal-lg {
  max-width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-grey-200);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-900);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-grey-600);
}

.modal-close:hover {
  color: var(--color-grey-900);
}

.modal-body {
  padding: var(--space-4);
}

.modal-footer {
  padding: var(--space-4);
  border-top: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

@media (max-width: 768px) {
  .modal-sm,
  .modal-md,
  .modal-lg {
    width: 90%;
    max-width: none;
  }
}
</style>
