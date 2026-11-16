<script setup lang="ts">
import { Columns2, Eye, Pencil } from '@lucide/vue';
import { ref } from 'vue';
import { SegmentedControl } from '@asterism-dev/lumen';

const mode = ref<'edit' | 'split' | 'view'>('edit');
</script>

<template>
  <SegmentedControl
    v-model="mode"
    :options="[
      { value: 'edit', icon: Pencil, ariaLabel: 'Edit' },
      { value: 'split', icon: Columns2, ariaLabel: 'Split' },
      { value: 'view', label: 'Preview', icon: Eye },
    ]"
  />
</template>
