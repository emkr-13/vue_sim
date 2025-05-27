<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import ProfileModal from "@/components/profile/ProfileModal.vue";

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const user = authStore.user;
const showProfileModal = ref(false);

const menuItems = [
  {
    name: "Dashboard",
    icon: "📊",
    route: "/dashboard",
    active: true,
  },
  {
    name: "Inventory",
    icon: "📦",
    submenu: [
      {
        name: "Categories",
        icon: "📁",
        route: "/categories",
      },
      {
        name: "Stores",
        icon: "🏪",
        route: "/stores",
      },
      {
        name: "Products",
        icon: "📝",
        route: "/products",
      },
      {
        name: "Stock Movements",
        icon: "🔄",
        route: "/stock-movements",
      },
    ],
  },
  {
    name: "Quotation",
    icon: "📋",
    route: "/quotations",
  },
  {
    name: "Purchase",
    icon: "🛒",
    route: "/purchases",
  },
  {
    name: "Report",
    icon: "📈",
    route: "/reports",
  },
  {
    name: "Accounts",
    icon: "👥",
    route: "/accounts",
  },
  {
    name: "User Profile",
    icon: "👤",
    route: "/profile",
  },
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

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <aside class="sidebar" :class="{ collapsed: collapsed }">
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
            active: item.route && $route.path === item.route,
            expanded: isSubmenuExpanded(item.name),
          }"
        >
          <div
            class="menu-item-content"
            @click="
              item.submenu ? toggleSubmenu(item.name) : navigateTo(item.route!)
            "
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text" v-if="!collapsed">{{ item.name }}</span>
            <span v-if="item.submenu && !collapsed" class="submenu-indicator">
              {{ isSubmenuExpanded(item.name) ? "▼" : "▶" }}
            </span>
          </div>

          <ul
            v-if="item.submenu"
            class="submenu"
            :class="{
              show: isSubmenuExpanded(item.name) && !collapsed,
              collapsed: collapsed,
            }"
          >
            <li
              v-for="subitem in item.submenu"
              :key="subitem.name"
              class="submenu-item"
              :class="{ active: $route.path === subitem.route }"
              @click="navigateTo(subitem.route)"
            >
              <span class="menu-icon">{{ subitem.icon }}</span>
              <span class="menu-text" v-if="!collapsed">{{
                subitem.name
              }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="theme-toggle" @click="toggleTheme">
      <span class="menu-icon">{{ themeStore.isDarkMode ? "🌙" : "☀️" }}</span>
      <span class="menu-text" v-if="!collapsed">{{
        themeStore.isDarkMode ? "Dark Mode" : "Light Mode"
      }}</span>
    </div>

    <div class="sidebar-profile">
      <div class="profile-container" @click="toggleProfileModal">
        <div class="profile-avatar">
          {{ user?.fullname?.charAt(0).toUpperCase() || "U" }}
        </div>
        <div class="profile-info" v-if="!collapsed">
          <p class="profile-name">{{ user?.fullname || "User" }}</p>
          <p class="profile-email">{{ user?.email || "No email" }}</p>
        </div>
      </div>
      <button class="logout-button" @click="handleLogout">
        <span class="menu-icon">🚪</span>
        <span class="menu-text" v-if="!collapsed">Logout</span>
      </button>
    </div>

    <ProfileModal :show="showProfileModal" @close="showProfileModal = false" />
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
  border-bottom: 1px solid var(--sidebar-border);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 72px;
  background-color: var(--sidebar-header-bg);
}

.sidebar-logo {
  color: var(--sidebar-active);
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
  background-color: var(--sidebar-active);
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
  border-left: 3px solid transparent;
}

.menu-item-content {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
}

.sidebar-menu-item:hover > .menu-item-content {
  background-color: var(--sidebar-hover-bg);
}

.sidebar-menu-item.active > .menu-item-content {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-active);
  font-weight: 500;
  border-left: 3px solid var(--sidebar-active);
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
  transition: transform 0.2s ease;
}

.expanded .submenu-indicator {
  transform: rotate(180deg);
}

.menu-text {
  font-size: 0.95rem;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.submenu.show {
  max-height: 500px; /* Adjust as needed */
}

.submenu.collapsed {
  position: absolute;
  left: 100%;
  top: 0;
  background-color: var(--sidebar-bg);
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-height: none;
  display: none;
}

.sidebar-menu-item:hover .submenu.collapsed {
  display: block;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4) var(--space-2)
    calc(var(--space-4) + 24px + var(--space-3));
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
}

.collapsed .submenu-item {
  padding: var(--space-3) var(--space-4);
}

.submenu-item:hover {
  background-color: var(--sidebar-hover-bg);
}

.submenu-item.active {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-active);
  font-weight: 500;
}

.theme-toggle {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  border-top: 1px solid var(--sidebar-border);
  transition: background-color var(--transition-speed) ease;
}

.theme-toggle:hover {
  background-color: var(--sidebar-hover-bg);
}

.sidebar-profile {
  padding: var(--space-4);
  border-top: 1px solid var(--sidebar-border);
  background-color: var(--sidebar-header-bg);
}

.profile-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-3);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-speed) ease;
}

.profile-container:hover {
  background-color: var(--sidebar-hover-bg);
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--sidebar-active);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: var(--space-3);
}

.collapsed .profile-avatar {
  margin-right: 0;
}

.profile-info {
  overflow: hidden;
}

.profile-name {
  margin: 0;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-email {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-grey-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-2);
  background-color: transparent;
  border: none;
  color: var(--sidebar-text);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-speed) ease;
}

.logout-button:hover {
  background-color: var(--sidebar-hover-bg);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style>
