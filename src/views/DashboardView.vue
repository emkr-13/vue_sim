<script setup lang="ts">
import {  onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const authStore = useAuthStore();
const user = authStore.user;

onMounted(() => {
  // Refresh user profile when component mounts
  if (!user) {
    authStore.fetchUserProfile();
  }
});
</script>

<template>
  <DashboardLayout>
    <div class="dashboard">
      <div class="welcome-card card">
        <h2 class="welcome-title">Welcome, {{ user?.fullname || 'User' }}!</h2>
        <p class="welcome-message">Welcome to your admin dashboard.</p>
      </div>
      
      <div class="dashboard-cards">
        <div class="stat-card card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3 class="stat-title">Statistics</h3>
            <p class="stat-value">12,345</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3 class="stat-title">Growth</h3>
            <p class="stat-value">+23%</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3 class="stat-title">Users</h3>
            <p class="stat-value">1,234</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3 class="stat-title">Revenue</h3>
            <p class="stat-value">$9,876</p>
          </div>
        </div>
      </div>
      
      <div class="recent-activity card">
        <h3 class="section-title">Recent Activity</h3>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">✏️</div>
            <div class="activity-content">
              <p class="activity-text">Profile updated</p>
              <p class="activity-time">2 hours ago</p>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">🔑</div>
            <div class="activity-content">
              <p class="activity-text">New login from Chrome on Windows</p>
              <p class="activity-time">Yesterday at 2:30 PM</p>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">📝</div>
            <div class="activity-content">
              <p class="activity-text">Settings changed</p>
              <p class="activity-time">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.welcome-card {
  padding: var(--space-5);
  background-color: var(--color-primary);
  color: white;
}

.welcome-title {
  font-size: 1.8rem;
  margin-bottom: var(--space-2);
}

.welcome-message {
  font-size: 1.1rem;
  opacity: 0.9;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
}

.stat-card {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
  margin-right: var(--space-3);
}

.stat-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-grey-600);
  margin-bottom: var(--space-1);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-900);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--space-3);
  color: var(--color-grey-800);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.activity-item {
  display: flex;
  align-items: center;
  padding: var(--space-3);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
}

.activity-icon {
  margin-right: var(--space-3);
  font-size: 1.2rem;
}

.activity-text {
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.activity-time {
  color: var(--color-grey-600);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
}
</style>