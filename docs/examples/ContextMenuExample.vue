<script setup lang="ts">
import { ref } from 'vue';
import { ContextMenu } from '@asterism-dev/lumen';

const last = ref('nothing yet');
const items = [
  { label: 'Open in terminal', action: () => (last.value = 'terminal') },
  { label: 'Copy path', action: () => (last.value = 'copy') },
  { label: 'Delete task', danger: true, action: () => (last.value = 'delete') },
];
</script>

<template>
  <div class="stack">
    <ContextMenu :items="items">
      <div class="target">Right-click (or long-press) this task</div>
    </ContextMenu>
    <span>Last action: {{ last }}</span>
  </div>
</template>

<style scoped>
.target {
  padding: 16px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
</style>
