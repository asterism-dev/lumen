<script setup lang="ts">
const model = defineModel<string>({ required: true });

withDefaults(defineProps<{ rows?: number; placeholder?: string; disabled?: boolean }>(), {
  rows: 3,
  placeholder: undefined,
});
</script>

<template>
  <textarea
    v-model="model"
    class="lm-textarea"
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
