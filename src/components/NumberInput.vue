<script setup lang="ts">
// Emits null while the field is empty
const model = defineModel<number | null>({ required: true });

defineProps<{ placeholder?: string; disabled?: boolean }>();

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  model.value = input.value === '' ? null : input.valueAsNumber;
}
</script>

<template>
  <input
    :value="model"
    class="lm-text-input"
    type="number"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
  />
</template>
