<script setup lang="ts">
import { useFieldControl } from '../composables/useField';

// Emits null while the field is empty
const model = defineModel<number | null>({ required: true });

const props = defineProps<{ placeholder?: string; disabled?: boolean; invalid?: boolean }>();
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  model.value = input.value === '' ? null : input.valueAsNumber;
}
</script>

<template>
  <input
    :value="model"
    class="lm-text-input"
    v-bind="control.attrs.value"
    type="number"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
  />
</template>
