<script setup lang="ts">
import { ref } from 'vue';
import { RadioGroup } from '@asterism-dev/lumen';

const filter = ref<'all' | 'open' | 'resolved'>('all');
</script>

<template>
  <RadioGroup
    v-model="filter"
    :options="[
      { value: 'all', label: 'All' },
      { value: 'open', label: 'Open' },
      { value: 'resolved', label: 'Resolved' },
    ]"
  />
</template>
