<script setup lang="ts">
import { Columns2, Eye, Pencil } from '@lucide/vue';
import { ref } from 'vue';
import { SegmentedControl } from '@asterism-dev/lumen';

const mode = ref<'edit' | 'split' | 'view'>('edit');
const session = ref<'agent' | 'shell'>('shell');
</script>

<template>
  <div class="stack">
    <SegmentedControl
      v-model="mode"
      :options="[
        { value: 'edit', icon: Pencil, ariaLabel: 'Edit' },
        { value: 'split', icon: Columns2, ariaLabel: 'Split' },
        { value: 'view', label: 'Preview', icon: Eye },
      ]"
    />
    <SegmentedControl
      v-model="session"
      size="sm"
      :options="[
        { value: 'agent', label: 'Agent', disabled: true, title: 'No agents installed' },
        { value: 'shell', label: 'Shell' },
      ]"
    />
  </div>
</template>
