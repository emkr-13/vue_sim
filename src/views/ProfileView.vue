<script setup lang="ts">
import {  computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Format date for display
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <DashboardLayout>
    <div class="profile-container">
      <div class="profile-header card">
        <div class="profile-avatar">
          {{ user?.fullname?.charAt(0).toUpperCase() || 'U' }}
        </div>
        <div class="profile-info">
          <h2 class="profile-name">{{ user?.fullname || 'User' }}</h2>
          <p class="profile-email">{{ user?.email || 'No email available' }}</p>
        </div>
      </div>
      
      <div class="profile-details card">
        <h3 class="section-title">Account Information</h3>
        
        <div class="detail-group">
          <span class="detail-label">Full Name</span>
          <span class="detail-value">{{ user?.fullname || 'Not available' }}</span>
        </div>
        
        <div class="detail-group">
          <span class="detail-label">Email Address</span>
          <span class="detail-value">{{ user?.email || 'Not available' }}</span>
        </div>
        
        <div class="detail-group">
          <span class="detail-label">Account Created</span>
          <span class="detail-value">{{ user?.usercreated ? formatDate(user.usercreated) : 'Not available' }}</span>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: var(--space-4);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin-right: var(--space-4);
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.profile-email {
  color: var(--color-grey-600);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--space-4);
  color: var(--color-grey-800);
}

.detail-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-grey-200);
}

.detail-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.detail-label {
  font-size: 0.875rem;
  color: var(--color-grey-600);
  margin-bottom: var(--space-1);
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: var(--space-3);
  }
}
</style>