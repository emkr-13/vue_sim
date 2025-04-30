<script setup lang="ts">
// Auth layout for login page
</script>

<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-logo">
        <h1>Admin Dashboard</h1>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-grey-100);
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: var(--space-4);
}

.auth-logo {
  text-align: center;
  margin-bottom: var(--space-5);
}

.auth-logo h1 {
  color: var(--color-primary);
  font-size: 1.8rem;
  font-weight: 700;
}
</style>