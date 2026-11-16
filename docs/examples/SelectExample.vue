<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '@asterism-dev/lumen';

const agent = ref('claude');
const options = [
  { value: 'claude', label: 'Claude' },
  { value: 'codex', label: 'Codex' },
  { value: 'gemini', label: 'Gemini (not installed)', disabled: true },
];
</script>

<template>
  <div class="stack">
    <Select v-model="agent" :options="options" aria-label="Agent" />
    <span>Selected: {{ agent }}</span>
  </div>
</template>
