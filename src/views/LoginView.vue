<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AuthLayout from '@/layouts/AuthLayout.vue';
import type { LoginCredentials } from '@/types';

const authStore = useAuthStore();

const credentials = ref<LoginCredentials>({
  email: '',
  password: ''
});

const isSubmitting = ref(false);
const validationErrors = ref<Record<string, string>>({});

const validate = (): boolean => {
  const errors: Record<string, string> = {};
  
  if (!credentials.value.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.value.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!credentials.value.password) {
    errors.password = 'Password is required';
  }
  
  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  
  isSubmitting.value = true;
  
  try {
    await authStore.login(credentials.value);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <AuthLayout>
    <div class="login-card card">
      <h2 class="login-title">Login to Dashboard</h2>
      
      <div class="alert alert-error" v-if="authStore.error">
        {{ authStore.error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="credentials.email"
            type="email"
            class="form-control"
            :class="{ 'error': validationErrors.email }"
            placeholder="Enter your email"
            autocomplete="email"
          />
          <p class="form-error" v-if="validationErrors.email">{{ validationErrors.email }}</p>
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            class="form-control"
            :class="{ 'error': validationErrors.password }"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
          <p class="form-error" v-if="validationErrors.password">{{ validationErrors.password }}</p>
        </div>
        
        <button
          type="submit"
          class="btn btn-primary login-btn"
          :disabled="isSubmitting || authStore.loading"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      
      <div class="login-info">
        <p>Demo credentials:</p>
        <p>Email: admin@mail.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.login-card {
  width: 100%;
}

.login-title {
  text-align: center;
  margin-bottom: var(--space-4);
  color: var(--color-grey-800);
  font-size: 1.5rem;
  font-weight: 600;
}

.login-form {
  margin-bottom: var(--space-4);
}

.login-btn {
  width: 100%;
  margin-top: var(--space-3);
  padding: var(--space-2) var(--space-3);
}

.form-control.error {
  border-color: var(--color-error);
}

.form-error {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: var(--space-1);
}

.alert {
  padding: var(--space-3);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
}

.alert-error {
  background-color: rgba(231, 76, 60, 0.1);
  color: var(--color-error);
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.login-info {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-grey-200);
  font-size: 0.875rem;
  color: var(--color-grey-600);
}
</style>