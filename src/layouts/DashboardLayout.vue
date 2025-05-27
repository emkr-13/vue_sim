<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Header from "@/components/dashboard/Header.vue";

const sidebarCollapsed = ref(false);
const authStore = useAuthStore();

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <div
    class="dashboard-layout"
    :class="{ 'sidebar-collapsed': sidebarCollapsed }"
  >
    <Sidebar :collapsed="sidebarCollapsed" />

    <div class="dashboard-content">
      <Header
        :toggleSidebar="toggleSidebar"
        :sidebarCollapsed="sidebarCollapsed"
        :logout="logout"
      />

      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--body-bg);
  color: var(--text-color);
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left var(--transition-speed) ease;
  margin-left: var(--sidebar-width);
}

.sidebar-collapsed .dashboard-content {
  margin-left: var(--sidebar-width-collapsed);
}

.main-content {
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
  background-color: var(--body-bg);
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
  }

  .sidebar-collapsed .dashboard-content {
    margin-left: 0;
  }
}
</style>
