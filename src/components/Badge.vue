<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'default' | 'muted' | 'success' | 'warning' | 'danger' | 'merged';
    variant?: 'plain' | 'outline' | 'pill';
    weight?: 'normal' | 'bold';
    as?: string;
  }>(),
  { tone: 'default', variant: 'plain', weight: 'bold', as: 'span' },
);
</script>

<template>
  <component
    :is="as"
    class="lm-badge"
    :class="[
      `lm-badge--${tone}`,
      { [`lm-badge--${variant}`]: variant !== 'plain', 'lm-badge--normal': weight === 'normal' },
    ]"
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
  .lm-badge--pill {
    font-size: 11px;
    padding: 0 7px;
    border-radius: 10px;
    background: var(--select);
  }
  .lm-badge--normal {
    font-weight: 400;
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
