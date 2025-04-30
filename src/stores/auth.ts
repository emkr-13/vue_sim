import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth';
import type { LoginCredentials, UserProfile } from '@/types';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const user = ref<UserProfile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        token.value = response.data.token;
        refreshToken.value = response.data.refreshToken;
        await fetchUserProfile();
        router.push('/dashboard');
      } else {
        error.value = response.message || 'Login failed';
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'An error occurred during login';
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserProfile() {
    if (!token.value) return;
    
    try {
      const response = await authService.getUserProfile();
      
      if (response.success) {
        user.value = response.data;
      }
    } catch (err: any) {
      console.error('Failed to fetch user profile:', err);
    }
  }

  async function logout() {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      token.value = null;
      refreshToken.value = null;
      user.value = null;
      router.push('/login');
    }
  }
  
  function checkTokenValidity() {
    if (!token.value) {
      router.push('/login');
      return;
    }
    fetchUserProfile();
  }

  return {
    token,
    refreshToken,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchUserProfile,
    checkTokenValidity
  };
}, {
  persist: {
    storage: localStorage,
    paths: ['token', 'refreshToken', 'user'],
  },
});