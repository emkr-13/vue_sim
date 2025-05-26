<script setup lang="ts">
import { computed } from "vue";
import type { Pagination as PaginationType } from "@/types";

interface Props {
  pagination: PaginationType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const handlePageChange = (page: number) => {
  if (page !== props.pagination.current) {
    emit("page-change", page);
  }
};

const showPrevButton = computed(() => !props.pagination.first_page);
const showNextButton = computed(() => !props.pagination.last_page);
</script>

<template>
  <div class="pagination-container">
    <button
      v-if="showPrevButton"
      class="btn btn-outline btn-sm pagination-btn"
      @click="handlePageChange(pagination.prev)"
      aria-label="Previous page"
    >
      &laquo; Prev
    </button>

    <div class="pagination-pages">
      <button
        v-for="page in pagination.detail"
        :key="page"
        class="btn btn-sm pagination-btn"
        :class="{
          'btn-primary': page === pagination.current,
          'btn-outline': page !== pagination.current,
        }"
        @click="handlePageChange(page)"
        :aria-label="`Page ${page}`"
        :aria-current="page === pagination.current ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </div>

    <button
      v-if="showNextButton"
      class="btn btn-outline btn-sm pagination-btn"
      @click="handlePageChange(pagination.next)"
      aria-label="Next page"
    >
      Next &raquo;
    </button>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin: var(--space-4) 0;
}

.pagination-pages {
  display: flex;
  gap: var(--space-1);
}

.pagination-btn {
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-wrap: wrap;
  }

  .pagination-pages {
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-btn {
    min-width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
}
</style>
