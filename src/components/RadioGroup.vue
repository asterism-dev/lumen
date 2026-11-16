<script setup lang="ts" generic="T extends string">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui';
import { useFieldControl } from '../composables/useField';

export interface RadioOption<V extends string = string> {
  value: V;
  label: string;
  disabled?: boolean;
}

const props = defineProps<{ options: RadioOption<T>[]; disabled?: boolean; invalid?: boolean }>();
const model = defineModel<T>({ required: true });
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);

defineSlots<{ option?: (props: { option: RadioOption<T> }) => unknown }>();
</script>

<template>
  <RadioGroupRoot
    v-model="model"
    :disabled="disabled"
    class="lm-radio-group"
    v-bind="control.attrs.value"
    :aria-labelledby="control.labelId"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="lm-choice"
      :class="{ 'lm-choice--disabled': disabled || option.disabled }"
    >
      <RadioGroupItem :value="option.value" :disabled="option.disabled" class="lm-radio">
        <RadioGroupIndicator class="lm-radio__dot" />
      </RadioGroupItem>
      <slot name="option" :option="option">{{ option.label }}</slot>
    </label>
  </RadioGroupRoot>
</template>

<style>
@layer lumen {
  .lm-radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
  }
  .lm-radio {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;
    background: var(--panel);
    border: 1px solid var(--muted);
    border-radius: 50%;
    cursor: inherit;
  }
  .lm-radio[data-state='checked'] {
    border-color: var(--accent);
  }
  .lm-radio:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .lm-radio__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }
}
</style>
