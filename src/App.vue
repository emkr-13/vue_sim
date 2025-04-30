<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
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