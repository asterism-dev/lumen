<script setup lang="ts">
import { provide } from 'vue';
import { formKey } from '../composables/useField';

const emit = defineEmits<{ submit: [event: Event] }>();

const fields = new Set<() => boolean>();
provide(formKey, { add: (v) => fields.add(v), remove: (v) => fields.delete(v) });

// Runs every field so all errors show at once, not just the first
function validate() {
  return [...fields].map((v) => v()).every(Boolean);
}

function onSubmit(event: Event) {
  if (validate()) emit('submit', event);
}

defineExpose({ validate });
</script>

<template>
  <form class="lm-form" @submit.prevent="onSubmit"><slot /></form>
</template>

<style>
@layer lumen {
  .lm-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
