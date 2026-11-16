<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    variant?: 'default' | 'accent' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: Component;
  }>(),
  { variant: 'default', type: 'button', icon: undefined },
);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="lm-button"
    :class="[`lm-button--${variant}`, { 'lm-button--icon-only': !$slots.default }]"
  >
    <component :is="icon" v-if="icon" :size="16" :stroke-width="1.75" />
    <slot />
  </button>
</template>

<style>
@layer lumen {
  .lm-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font: inherit;
    color: inherit;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 3px 9px;
    cursor: pointer;
  }
  .lm-button:hover:not(:disabled) {
    background: var(--select);
  }
  .lm-button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .lm-button--accent {
    background: var(--accent);
    color: var(--on-accent);
    border-color: var(--accent);
  }
  .lm-button--accent:hover:not(:disabled) {
    background: var(--accent);
  }
  .lm-button--danger {
    color: var(--danger);
    border-color: var(--danger);
  }
  .lm-button svg {
    flex: none;
  }
  @media (max-width: 767.98px) {
    .lm-button {
      min-height: 44px;
    }
    .lm-button--icon-only {
      min-width: 44px;
    }
  }
}
</style>
