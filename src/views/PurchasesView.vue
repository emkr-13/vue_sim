import DashboardLayout from "@/layouts/DashboardLayout.vue";
<script setup lang="ts">
// No imports needed for now
</script>

<template>
<DashboardLayout>
  <div class="purchases-view">
    <div class="page-header">
      <h1>Purchases</h1>
      <p>Manage your purchase orders</p>
    </div>

    <div class="content-placeholder">
      <div class="placeholder-icon">🛒</div>
      <h2>Purchases Management</h2>
      <p>This page will display and manage all your purchase orders.</p>
    </div>
  </div>
</DashboardLayout>
</template>

<style scoped>
.purchases-view {
  padding: var(--space-4);
}

.page-header {
  margin-bottom: var(--space-6);
}

.page-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-grey-900);
}

.page-header p {
  margin: var(--space-1) 0 0;
  color: var(--color-grey-600);
}

.content-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.content-placeholder h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 var(--space-2);
  color: var(--color-grey-900);
}

.content-placeholder p {
  color: var(--color-grey-600);
  max-width: 500px;
}
</style>
