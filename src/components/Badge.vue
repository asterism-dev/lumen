<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'default' | 'muted' | 'success' | 'warning' | 'danger' | 'merged';
    variant?: 'plain' | 'outline';
    as?: string;
  }>(),
  { tone: 'default', variant: 'plain', as: 'span' },
);
</script>

<template>
  <component
    :is="as"
    class="lm-badge"
    :class="[`lm-badge--${tone}`, { 'lm-badge--outline': variant === 'outline' }]"
    ><slot
  /></component>
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
  .lm-badge--outline {
    font-size: 11px;
    padding: 0 6px;
    border-radius: 8px;
    border: 1px solid var(--border);
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
