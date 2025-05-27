<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  // Check token validity on app load
  if (authStore.isAuthenticated) {
    authStore.checkTokenValidity();
  }

  // Initialize theme
  themeStore.initTheme();
});
</script>

<template>
  <router-view />
</template>
