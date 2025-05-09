<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ProfileModal from '@/components/profile/ProfileModal.vue';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const authStore = useAuthStore();
const user = authStore.user;
const showProfileModal = ref(false);

const menuItems = [
  { 
    name: 'Dashboard', 
    icon: '📊', 
    route: '/dashboard',
    active: true 
  },
  {
    name: 'Inventory',
    icon: '📦',
    submenu: [
      {
        name: 'Categories',
        icon: '📁',
        route: '/categories'
      },
      {
        name: 'Stores',
        icon: '🏪',
        route: '/stores'
      }
    ]
  }
];

const expandedMenus = ref<string[]>([]);

const toggleSubmenu = (menuName: string) => {
  const index = expandedMenus.value.indexOf(menuName);
  if (index === -1) {
    expandedMenus.value.push(menuName);
  } else {
    expandedMenus.value.splice(index, 1);
  }
};

const isSubmenuExpanded = (menuName: string): boolean => {
  return expandedMenus.value.includes(menuName);
};

const navigateTo = (route: string) => {
  router.push(route);
};

const handleLogout = () => {
  authStore.logout();
};

const toggleProfileModal = () => {
  showProfileModal.value = !showProfileModal.value;
};
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <div class="sidebar-header">
      <h1 class="sidebar-logo" v-if="!collapsed">Admin</h1>
      <span class="sidebar-logo-icon" v-else>A</span>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="sidebar-menu">
        <li 
          v-for="item in menuItems" 
          :key="item.name"
          :class="{ 
            'sidebar-menu-item': true,
            'has-submenu': item.submenu,
            'active': item.route && $route.path === item.route,
            'expanded': isSubmenuExpanded(item.name)
          }"
        >
          <div 
            class="menu-item-content"
            @click="item.submenu ? toggleSubmenu(item.name) : navigateTo(item.route!)"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text" v-if="!collapsed">{{ item.name }}</span>
            <span 
              v-if="item.submenu && !collapsed" 
              class="submenu-indicator"
            >
              {{ isSubmenuExpanded(item.name) ? '▼' : '▶' }}
            </span>
          </div>
          
          <ul 
            v-if="item.submenu" 
            class="submenu"
            :class="{ 
              'show': isSubmenuExpanded(item.name) && !collapsed,
              'collapsed': collapsed 
            }"
          >
            <li 
              v-for="subitem in item.submenu"
              :key="subitem.name"
              class="submenu-item"
              :class="{ 'active': $route.path === subitem.route }"
              @click="navigateTo(subitem.route)"
            >
              <span class="menu-icon">{{ subitem.icon }}</span>
              <span class="menu-text" v-if="!collapsed">{{ subitem.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="sidebar-profile">
      <div class="profile-container" @click="toggleProfileModal">
        <div class="profile-avatar">
          {{ user?.fullname?.charAt(0).toUpperCase() || 'U' }}
        </div>
        <div class="profile-info" v-if="!collapsed">
          <p class="profile-name">{{ user?.fullname || 'User' }}</p>
          <p class="profile-email">{{ user?.email || 'No email' }}</p>
        </div>
      </div>
      <button class="logout-button" @click="handleLogout">
        <span class="menu-icon">🚪</span>
        <span class="menu-text" v-if="!collapsed">Logout</span>
      </button>
    </div>

    <ProfileModal 
      :show="showProfileModal"
      @close="showProfileModal = false"
    />
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-speed) ease;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.sidebar-header {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 72px;
}

.sidebar-logo {
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
}

.sidebar-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2rem;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3) 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu-item {
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
  white-space: nowrap;
}

.menu-item-content {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
}

.sidebar-menu-item:hover > .menu-item-content {
  background-color: var(--color-grey-100);
}

.sidebar-menu-item.active > .menu-item-content {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  font-weight: 500;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--space-3);
}

.collapsed .menu-icon {
  margin-right: 0;
}

.submenu-indicator {
  margin-left: auto;
  font-size: 0.75rem;
  transition: transform var(--transition-speed) ease;
}

.expanded .submenu-indicator {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--transition-speed) ease;
}

.submenu.show {
  max-height: 500px;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4) var(--space-2) calc(var(--space-4) + 24px + var(--space-3));
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
}

.submenu-item:hover {
  background-color: var(--color-grey-100);
}

.submenu-item.active {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  font-weight: 500;
}

.sidebar-profile {
  border-top: 1px solid var(--color-grey-200);
  padding: var(--space-3);
  margin-top: auto;
  background-color: var(--color-grey-100);
}

.profile-container {
  display: flex;
  align-items: center;
  padding-bottom: var(--space-3);
  cursor: pointer;
  transition: opacity var(--transition-speed) ease;
}

.profile-container:hover {
  opacity: 0.8;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: var(--space-3);
  flex-shrink: 0;
}

.profile-info {
  overflow: hidden;
}

.profile-name {
  font-weight: 600;
  color: var(--color-grey-900);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-email {
  font-size: 0.875rem;
  color: var(--color-grey-600);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background-color: transparent;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  color: var(--color-grey-700);
  transition: all var(--transition-speed) ease;
}

.logout-button:hover {
  background-color: var(--color-grey-200);
  color: var(--color-error);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
    z-index: 1000;
  }
  
  .sidebar.collapsed {
    width: var(--sidebar-width);
    transform: translateX(0);
  }
}
</style>