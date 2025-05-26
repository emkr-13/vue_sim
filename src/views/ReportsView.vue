<script setup lang="ts">
// No imports needed for now
</script>

<template>
  <div class="reports-view">
    <div class="page-header">
      <h1>Reports</h1>
      <p>View and generate business reports</p>
    </div>

    <div class="content-placeholder">
      <div class="placeholder-icon">📈</div>
      <h2>Reports</h2>
      <p>
        This page will display and generate various business reports and
        analytics.
      </p>
    </div>
  </div>
</template>

<style scoped>
.reports-view {
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
