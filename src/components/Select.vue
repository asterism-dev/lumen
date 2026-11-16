<script setup lang="ts" generic="T extends string | number">
import { useFieldControl } from '../composables/useField';

export interface SelectOption<V extends string | number = string> {
  value: V;
  label: string;
  disabled?: boolean;
}

const props = defineProps<{ options: SelectOption<T>[]; disabled?: boolean; invalid?: boolean }>();
const model = defineModel<T>({ required: true });
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);
</script>

<template>
  <select v-model="model" class="lm-select" v-bind="control.attrs.value" :disabled="disabled">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>
