<script setup lang="ts">
import { FileText, Terminal } from '@lucide/vue';
import { ref } from 'vue';
import { Badge, Tabs } from '@asterism-dev/lumen';

const tabs = ref([
  { value: 'terminal', label: 'Terminal', icon: Terminal },
  { value: 'notes', label: 'Notes', icon: FileText },
]);
const active = ref('terminal');
const reviewTab = ref('files');
const reviewTabs = [
  { value: 'conversation', label: 'Conversation', count: 4 },
  { value: 'files', label: 'Files', count: 12 },
];

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
  <Tabs v-model="reviewTab" :tabs="reviewTabs" variant="underline" aria-label="Review">
    <template #tab="{ tab }">
      {{ tab.label }}
      <Badge variant="outline">{{ reviewTabs.find((t) => t.value === tab.value)?.count }}</Badge>
    </template>
    <template #end><Badge tone="success">+120</Badge><Badge tone="danger">−8</Badge></template>
  </Tabs>
  <p>Showing {{ reviewTab }}, rendered by the caller.</p>
</template>
