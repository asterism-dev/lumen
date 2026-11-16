<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'default' | 'muted' | 'success' | 'warning' | 'danger' | 'merged';
    as?: string;
  }>(),
  { tone: 'default', as: 'span' },
);
</script>

<template>
  <component :is="as" class="lm-badge" :class="`lm-badge--${tone}`"><slot /></component>
</template>

<style>
@layer lumen {
  .lm-badge {
    flex: none;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
  }
  .lm-badge--muted {
    color: var(--muted);
  }
  .lm-badge--success {
    color: var(--success);
  }
  .lm-badge--warning {
    color: var(--warning);
  }
  .lm-badge--danger {
    color: var(--danger);
  }
  .lm-badge--merged {
    color: var(--merged);
  }
}
</style>
