<script setup lang="ts">
import { ListboxItem } from 'reka-ui';

defineProps<{ value: string; disabled?: boolean }>();
</script>

<template>
  <ListboxItem :value="value" :disabled="disabled" class="lm-list-item">
    <span v-if="$slots.icon" class="lm-list-item__icon"><slot name="icon" /></span>
    <span class="lm-list-item__label"><slot /></span>
    <span
      v-if="$slots.actions"
      class="lm-list-item__actions"
      @click.stop
      @pointerdown.stop
      @keydown.enter.stop
      @keydown.space.stop
    >
      <slot name="actions" />
    </span>
  </ListboxItem>
</template>

<style>
@layer lumen {
  .lm-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: var(--lm-touch-target, 28px);
    padding: 4px 6px;
    border-radius: var(--radius);
    cursor: default;
  }
  .lm-list-item[data-highlighted],
  .lm-list-item[data-state='checked'] {
    background: var(--select);
  }
  .lm-list-item[data-disabled] {
    color: var(--muted);
  }
  .lm-list-item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-list-item__icon {
    display: inline-flex;
    flex: none;
  }
  .lm-list-item__icon svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.75;
  }
  .lm-list-item__label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lm-list-item__actions {
    display: inline-flex;
    flex: none;
    align-items: center;
    visibility: hidden;
  }
  .lm-list-item:hover .lm-list-item__actions,
  .lm-list-item:focus-within .lm-list-item__actions {
    visibility: visible;
  }
  @media (max-width: 767.98px) {
    .lm-list-item__actions {
      visibility: visible;
    }
  }
  .lm-touch .lm-list-item__actions {
    visibility: visible;
  }
}
</style>
