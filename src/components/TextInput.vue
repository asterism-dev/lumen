<script setup lang="ts">
import { useFieldControl } from '../composables/useField';

const model = defineModel<string>({ required: true });

const props = withDefaults(
  defineProps<{
    type?: 'text' | 'search' | 'password';
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
  }>(),
  {
    type: 'text',
    placeholder: undefined,
  },
);
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);
</script>

<template>
  <input
    v-model="model"
    class="lm-text-input"
    v-bind="control.attrs.value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<style>
@layer lumen {
  .lm-text-input,
  .lm-textarea,
  .lm-select {
    font: inherit;
    color: inherit;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 5px 8px;
    width: 100%;
    box-sizing: border-box;
  }
  .lm-text-input:focus-visible,
  .lm-textarea:focus-visible,
  .lm-select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-text-input:disabled,
  .lm-textarea:disabled,
  .lm-select:disabled {
    opacity: 0.5;
  }
  @media (max-width: 767.98px) {
    .lm-text-input,
    .lm-textarea,
    .lm-select {
      font-size: 16px;
    }
    .lm-text-input,
    .lm-select {
      min-height: 44px;
    }
  }
}
</style>
