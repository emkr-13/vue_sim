<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  // Check token validity on app load
  if (authStore.isAuthenticated) {
    authStore.checkTokenValidity();
  }
});
</script>

<template>
  <router-view />
</template>