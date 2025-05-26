```vue
<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div class="modal" v-if="show" @click.self="handleClose">
    <div class="modal-content card">
      <div class="modal-header">
        <div class="user-avatar">
          {{ user?.fullname?.charAt(0).toUpperCase() || "U" }}
        </div>
        <button class="close-button" @click="handleClose">&times;</button>
      </div>

      <div class="profile-sections">
        <section class="profile-section">
          <h3>Personal Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Full Name</label>
              <p>{{ user?.fullname || "Not available" }}</p>
            </div>
            <div class="info-item">
              <label>Email</label>
              <p>{{ user?.email || "Not available" }}</p>
            </div>
          </div>
        </section>

        <section class="profile-section">
          <h3>Account Details</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Account Created</label>
              <p>
                {{
                  user?.usercreated
                    ? formatDate(user.usercreated)
                    : "Not available"
                }}
              </p>
            </div>
            <div class="info-item">
              <label>Account Type</label>
              <p>Standard Account</p>
            </div>
          </div>
        </section>

        <section class="profile-section">
          <h3>Activity Statistics</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-icon">📊</span>
              <div class="stat-info">
                <label>Total Logins</label>
                <p>24</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">📅</span>
              <div class="stat-info">
                <label>Days Active</label>
                <p>45</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">📈</span>
              <div class="stat-info">
                <label>Actions</label>
                <p>156</p>
              </div>
            </div>
          </div>
        </section>

        <section class="profile-section">
          <h3>Preferences</h3>
          <div class="preferences-list">
            <div class="preference-item">
              <label>
                <input type="checkbox" checked disabled />
                Email Notifications
              </label>
            </div>
            <div class="preference-item">
              <label>
                <input type="checkbox" disabled />
                Two-Factor Authentication
              </label>
            </div>
            <div class="preference-item">
              <label>
                <input type="checkbox" checked disabled />
                Activity Alerts
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.modal-content {
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 0;
}

.modal-header {
  padding: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--space-2);
  color: var(--color-grey-600);
  transition: color var(--transition-speed) ease;
}

.close-button:hover {
  color: var(--color-grey-900);
}

.profile-sections {
  padding: var(--space-4);
}

.profile-section {
  margin-bottom: var(--space-5);
}

.profile-section h3 {
  color: var(--color-grey-900);
  margin-bottom: var(--space-3);
  font-size: 1.2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.info-item label {
  color: var(--color-grey-600);
  font-size: 0.875rem;
  margin-bottom: var(--space-1);
  display: block;
}

.info-item p {
  color: var(--color-grey-900);
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-3);
}

.stat-card {
  display: flex;
  align-items: center;
  padding: var(--space-3);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
}

.stat-icon {
  font-size: 1.5rem;
  margin-right: var(--space-2);
}

.stat-info label {
  color: var(--color-grey-600);
  font-size: 0.875rem;
  display: block;
}

.stat-info p {
  color: var(--color-grey-900);
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0;
}

.preferences-list {
  display: grid;
  gap: var(--space-2);
}

.preference-item {
  display: flex;
  align-items: center;
}

.preference-item label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-grey-700);
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .info-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```
