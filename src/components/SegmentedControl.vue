<script setup lang="ts" generic="T extends string">
import type { Component } from 'vue';
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui';

export interface SegmentOption<V extends string = string> {
  value: V;
  label?: string;
  icon?: Component;
  ariaLabel?: string;
  disabled?: boolean;
  // Shown as tooltip, e.g. why the option is disabled
  title?: string;
}

withDefaults(
  defineProps<{ options: SegmentOption<T>[]; disabled?: boolean; size?: 'md' | 'sm' }>(),
  { size: 'md' },
);
const model = defineModel<T>({ required: true });

defineSlots<{ option?: (props: { option: SegmentOption<T>; active: boolean }) => unknown }>();

function onUpdate(value: unknown) {
  // Reka emits an empty value when the active item is clicked again
  if (typeof value === 'string' && value) model.value = value as T;
}
</script>

<template>
  <ToggleGroupRoot
    type="single"
    :model-value="model"
    :disabled="disabled"
    class="lm-segmented"
    :class="{ 'lm-segmented--sm': size === 'sm' }"
    @update:model-value="onUpdate"
  >
    <ToggleGroupItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :aria-label="option.ariaLabel"
      :title="option.title"
      class="lm-button lm-segmented__item"
      :class="{ 'lm-button--icon-only': !option.label && !$slots.option }"
    >
      <slot name="option" :option="option" :active="option.value === model">
        <component :is="option.icon" v-if="option.icon" :size="16" :stroke-width="1.75" />
        <template v-if="option.label">{{ option.label }}</template>
      </slot>
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
  .lm-segmented--sm {
    gap: 2px;
  }
  .lm-segmented--sm .lm-segmented__item,
  .lm-segmented--sm .lm-segmented__item[data-state='on'] {
    border-color: transparent;
    padding: 2px 8px;
  }
}
</style>
