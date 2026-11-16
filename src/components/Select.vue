<script setup lang="ts" generic="T extends string | number">
export interface SelectOption<V extends string | number = string> {
  value: V;
  label: string;
  disabled?: boolean;
}

defineProps<{ options: SelectOption<T>[]; disabled?: boolean }>();
const model = defineModel<T>({ required: true });
</script>

<template>
  <select v-model="model" class="lm-select" :disabled="disabled">
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
