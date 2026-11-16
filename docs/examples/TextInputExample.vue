<script setup lang="ts">
import { ref } from 'vue';
import { TextInput } from '@asterism-dev/lumen';

const name = ref('');
const token = ref('');
</script>

<template>
  <div class="stack">
    <TextInput v-model="name" placeholder="Task name" aria-label="Task name" />
    <TextInput v-model="token" type="password" placeholder="API token" aria-label="API token" />
  </div>
</template>
