<script setup lang="ts">
import { FileText, Terminal } from '@lucide/vue';
import { ref } from 'vue';
import { Tabs } from '@asterism-dev/lumen';

const tabs = ref([
  { value: 'terminal', label: 'Terminal', icon: Terminal },
  { value: 'notes', label: 'Notes', icon: FileText },
]);
const active = ref('terminal');

function close(value: string) {
  tabs.value = tabs.value.filter((t) => t.value !== value);
  if (active.value === value) active.value = tabs.value[0]?.value ?? '';
}
</script>

<template>
  <Tabs v-model="active" :tabs="tabs" closable @close="close">
    <template #terminal><p>Terminal content</p></template>
    <template #notes><p>Notes content</p></template>
  </Tabs>
</template>
