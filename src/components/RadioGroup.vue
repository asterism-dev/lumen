<script setup lang="ts" generic="T extends string">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui';
import { useFieldControl } from '../composables/useField';

export interface RadioOption<V extends string = string> {
  value: V;
  label: string;
  disabled?: boolean;
  title?: string;
}

const props = withDefaults(
  defineProps<{
    options: RadioOption<T>[];
    disabled?: boolean;
    invalid?: boolean;
    // custom: the option slot is the whole item (e.g. a color swatch), without radio dot
    variant?: 'radio' | 'custom';
  }>(),
  { variant: 'radio' },
);
const model = defineModel<T>({ required: true });
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);

defineSlots<{ option?: (props: { option: RadioOption<T>; checked: boolean }) => unknown }>();
</script>

<template>
  <RadioGroupRoot
    v-model="model"
    :disabled="disabled"
    class="lm-radio-group"
    v-bind="control.attrs.value"
    :aria-labelledby="control.labelId"
  >
    <template v-if="variant === 'custom'">
      <RadioGroupItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :aria-label="option.label"
        :title="option.title"
        class="lm-radio-custom"
      >
        <slot name="option" :option="option" :checked="option.value === model">{{
          option.label
        }}</slot>
      </RadioGroupItem>
    </template>
    <template v-else>
      <label
        v-for="option in options"
        :key="option.value"
        class="lm-choice"
        :class="{ 'lm-choice--disabled': disabled || option.disabled }"
        :title="option.title"
      >
        <RadioGroupItem :value="option.value" :disabled="option.disabled" class="lm-radio">
          <RadioGroupIndicator class="lm-radio__dot" />
        </RadioGroupItem>
        <slot name="option" :option="option" :checked="option.value === model">{{
          option.label
        }}</slot>
      </label>
    </template>
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
  .lm-radio-custom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
  }
  .lm-radio-custom[data-state='checked'] {
    box-shadow:
      0 0 0 2px var(--panel),
      0 0 0 4px var(--accent);
  }
  .lm-radio-custom:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .lm-radio-custom:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 6px;
  }
  .lm-radio__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }
}
</style>
