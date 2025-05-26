<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const user = authStore.user;

const timeFilter = ref<
  "today"  | "last_week" | "last_two_weeks" | "this_month"
>("this_month");
const loading = ref(false);

const fetchDashboardData = async () => {
  loading.value = true;
  try {
    await Promise.all([
      dashboardStore.fetchGeneralSummary(),
      dashboardStore.fetchSpecificSummary(timeFilter.value),
    ]);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

const changeTimeFilter = async (
  filter: "today"  | "last_week" | "last_two_weeks" | "this_month"
) => {
  timeFilter.value = filter;
  await dashboardStore.fetchSpecificSummary(filter);
};

onMounted(() => {
  // Refresh user profile when component mounts
  if (!user) {
    authStore.fetchUserProfile();
  }

  fetchDashboardData();
});
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <div class="menu-icon">
          <i class="fas fa-bars"></i>
          <span>Dashboard</span>
        </div>
        <div class="user-info">
          <span>{{ user?.fullname || "Admin User" }}</span>
        </div>
      </div>

      <!-- Dashboard Title -->
      <div class="dashboard-title">
        <h2>Dashboard</h2>
      </div>

      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <div class="welcome-content">
          <h1 class="welcome-title">
            Welcome, {{ user?.fullname || "Admin User" }}!
          </h1>
          <p class="welcome-subtitle">
            Here's what's happening with your business today.
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon users-icon">
            <span>people</span>
          </div>
          <div class="stat-info">
            <h3>Customers</h3>
            <p class="stat-value">
              {{ dashboardStore.generalData?.total_customers || 0 }}
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon products-icon">
            <span>inventory_2</span>
          </div>
          <div class="stat-info">
            <h3>Products</h3>
            <p class="stat-value">
              {{ dashboardStore.generalData?.total_products || 0 }}
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon suppliers-icon">
            <span>category</span>
          </div>
          <div class="stat-info">
            <h3>Suppliers</h3>
            <p class="stat-value">
              {{ dashboardStore.generalData?.total_suppliers || 0 }}
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stores-icon">
            <span>store</span>
          </div>
          <div class="stat-info">
            <h3>Stores</h3>
            <p class="stat-value">
              {{ dashboardStore.generalData?.total_stores || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Financial Summary -->
      <div class="dashboard-row">
        <div class="financial-summary">
          <div class="card-header">
            <h2>Financial Summary</h2>
            <div class="time-filter">
              <select
                v-model="timeFilter"
                @change="changeTimeFilter(timeFilter)"
              >
                <option value="today">Today</option>
                <option value="last_week">Last Week</option>
                <option value="last_two_weeks">Last Two Weeks</option>
                <option value="this_month">This Month</option>
              </select>
            </div>
          </div>

          <div class="financial-metrics">
            <div class="metric">
              <div class="metric-icon quotations-icon">
                <span>description</span>
              </div>
              <div class="metric-info">
                <h3>Quotations</h3>
                <p class="metric-value">
                  {{ dashboardStore.specificData?.total_quotations || 0 }}
                </p>
              </div>
            </div>

            <div class="metric">
              <div class="metric-icon purchases-icon">
                <span>shopping_cart</span>
              </div>
              <div class="metric-info">
                <h3>Purchases</h3>
                <p class="metric-value">
                  {{ dashboardStore.specificData?.total_purchases || 0 }}
                </p>
              </div>
            </div>

            <div class="metric">
              <div class="metric-icon stock-in-icon">
                <span>arrow_downward</span>
              </div>
              <div class="metric-info">
                <h3>Stock In</h3>
                <p class="metric-value">
                  {{
                    dashboardStore.specificData?.total_stock_movements_in || 0
                  }}
                </p>
              </div>
            </div>

            <div class="metric">
              <div class="metric-icon stock-out-icon">
                <span>arrow_upward</span>
              </div>
              <div class="metric-info">
                <h3>Stock Out</h3>
                <p class="metric-value">
                  {{
                    dashboardStore.specificData?.total_stock_movements_out || 0
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Error State -->
      <div v-if="dashboardStore.error" class="error-message">
        <p>{{ dashboardStore.error }}</p>
        <button @click="fetchDashboardData" class="retry-button">Retry</button>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-container {
  width: 100%;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 0 1.5rem 1.5rem;
  position: relative;
}

.top-nav {
  background-color: #fff;
  padding: 1rem 1.5rem;
  margin: 0 -1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.user-info {
  font-weight: 500;
}

.dashboard-title {
  margin-bottom: 1.5rem;
}

.dashboard-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.welcome-banner {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: white;
}

.users-icon {
  background-color: #3b82f6;
}

.products-icon {
  background-color: #10b981;
}

.suppliers-icon {
  background-color: #f59e0b;
}

.stores-icon {
  background-color: #8b5cf6;
}

.stat-info h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.dashboard-row {
  margin-bottom: 1.5rem;
}

.financial-summary {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.time-filter select {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: #fff;
  font-size: 0.875rem;
  color: #374151;
}

.financial-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.25rem;
}

.metric {
  display: flex;
  align-items: center;
}

.metric-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.25rem;
  color: white;
}

.quotations-icon {
  background-color: #3b82f6;
}

.purchases-icon {
  background-color: #f59e0b;
}

.stock-in-icon {
  background-color: #10b981;
}

.stock-out-icon {
  background-color: #ef4444;
}

.metric-info h3 {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4f46e5;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.retry-button {
  background-color: #b91c1c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .financial-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
