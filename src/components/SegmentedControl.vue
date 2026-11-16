<script setup lang="ts" generic="T extends string">
import type { Component } from 'vue';
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui';

export interface SegmentOption<V extends string = string> {
  value: V;
  label?: string;
  icon?: Component;
  ariaLabel?: string;
}

defineProps<{ options: SegmentOption<T>[] }>();
const model = defineModel<T>({ required: true });

function onUpdate(value: unknown) {
  // Reka emits an empty value when the active item is clicked again
  if (typeof value === 'string' && value) model.value = value as T;
}
</script>

<template>
  <ToggleGroupRoot
    type="single"
    :model-value="model"
    class="lm-segmented"
    @update:model-value="onUpdate"
  >
    <ToggleGroupItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :aria-label="option.ariaLabel"
      class="lm-button lm-segmented__item"
      :class="{ 'lm-button--icon-only': !option.label }"
    >
      <component :is="option.icon" v-if="option.icon" :size="16" :stroke-width="1.75" />
      <template v-if="option.label">{{ option.label }}</template>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<style>
@layer lumen {
  .lm-segmented {
    display: flex;
    gap: 6px;
  }
  .lm-segmented__item[data-state='on'] {
    background: var(--select);
    border-color: var(--accent);
  }
}
</style>
