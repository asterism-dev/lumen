<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '@asterism-dev/lumen';

const agent = ref('claude');
const workspace = ref<number | null>(null);
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
    <Select
      v-model="workspace"
      :options="[
        { value: 1, label: 'Work' },
        { value: 2, label: 'Private' },
      ]"
      placeholder="Choose a workspace"
      aria-label="Workspace"
    />
  </div>
</template>
