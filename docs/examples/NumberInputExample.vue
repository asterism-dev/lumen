<script setup lang="ts">
import { ref } from 'vue';
import { NumberInput } from '@asterism-dev/lumen';

const port = ref<number | null>(8080);
</script>

<template>
  <div class="stack">
    <NumberInput v-model="port" min="1" max="65535" aria-label="Port" />
    <span>Value: {{ port === null ? 'null' : port }}</span>
  </div>
</template>
