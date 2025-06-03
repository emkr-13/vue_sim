import { ref } from 'vue';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id: number;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export function useToast() {
  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = nextId++;
    const toast: Toast = {
      message,
      type,
      id,
    };
    toasts.value.push(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
} 