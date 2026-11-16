<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@asterism-dev/lumen';

const prompt = ref('');
</script>

<template>
  <Textarea v-model="prompt" :rows="4" placeholder="Describe the task" aria-label="Prompt" />
</template>
