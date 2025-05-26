<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { PropType } from "vue";

defineProps({
  toggleSidebar: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },
  sidebarCollapsed: {
    type: Boolean,
    default: false,
  },
  logout: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },
});

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <header class="header">
    <div class="header-start">
      <button class="menu-toggle" @click="toggleSidebar">
        <span class="menu-icon">≡</span>
      </button>
      <h2 class="header-title">{{ $route.name }}</h2>
    </div>

    <div class="header-end">
      <div class="user-profile" v-if="user">
        <span class="user-name">{{ user.fullname }}</span>
        <div class="user-menu">
          <button class="btn-logout" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 72px;
  padding: 0 var(--space-4);
  background-color: white;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-start {
  display: flex;
  align-items: center;
}

.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-speed) ease;
  margin-right: var(--space-3);
}

.menu-toggle:hover {
  background-color: var(--color-grey-200);
}

.menu-icon {
  font-size: 1.5rem;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-800);
  text-transform: capitalize;
}

.header-end {
  display: flex;
  align-items: center;
}

.user-profile {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-name {
  font-weight: 500;
  margin-right: var(--space-2);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: var(--space-2);
  min-width: 150px;
  display: none;
}

.user-profile:hover .user-menu {
  display: block;
}

.btn-logout {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: var(--space-2) var(--space-3);
  width: 100%;
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-speed) ease;
}

.btn-logout:hover {
  background-color: var(--color-grey-200);
}
</style>
