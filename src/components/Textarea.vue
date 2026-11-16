<script setup lang="ts">
import { useFieldControl } from '../composables/useField';

const model = defineModel<string>({ required: true });

const props = withDefaults(
  defineProps<{ rows?: number; placeholder?: string; disabled?: boolean; invalid?: boolean }>(),
  { rows: 3, placeholder: undefined },
);
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);
</script>

<template>
  <textarea
    v-model="model"
    class="lm-textarea"
    v-bind="control.attrs.value"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<style>
@layer lumen {
  .lm-textarea {
    resize: vertical;
  }
}
</style>
