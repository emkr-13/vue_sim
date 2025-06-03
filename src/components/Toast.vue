<script setup lang="ts">
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();

const getToastClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'toast-success';
    case 'error':
      return 'toast-error';
    case 'warning':
      return 'toast-warning';
    default:
      return 'toast-info';
  }
};
</script>

<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', getToastClass(toast.type)]"
        @click="removeToast(toast.id)"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  padding: 1rem;
  border-radius: var(--border-radius);
  background: white;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  min-width: 250px;
  max-width: 400px;
  animation: slide-in 0.2s ease-out;
}

.toast-success {
  background-color: var(--color-success-50);
  color: var(--color-success-700);
  border-left: 4px solid var(--color-success-500);
}

.toast-error {
  background-color: var(--color-error-50);
  color: var(--color-error-700);
  border-left: 4px solid var(--color-error-500);
}

.toast-warning {
  background-color: var(--color-warning-50);
  color: var(--color-warning-700);
  border-left: 4px solid var(--color-warning-500);
}

.toast-info {
  background-color: var(--color-info-50);
  color: var(--color-info-700);
  border-left: 4px solid var(--color-info-500);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 