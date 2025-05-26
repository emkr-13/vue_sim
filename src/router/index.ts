import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Define routes with components loaded dynamically
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("@/views/CategoriesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/stores",
    name: "stores",
    component: () => import("@/views/StoresView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/views/ProductsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/stock-movements",
    name: "stockMovements",
    component: () => import("@/views/StockMovementsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/quotations",
    name: "quotations",
    component: () => import("@/views/QuotationsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/purchases",
    name: "purchases",
    component: () => import("@/views/PurchasesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("@/views/ReportsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/accounts",
    name: "accounts",
    component: () => import("@/views/AccountsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
