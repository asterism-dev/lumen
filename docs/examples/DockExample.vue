<script setup lang="ts">
import { ref } from 'vue';
import { Dock, type DockPanel } from '@asterism-dev/lumen/dock';

const panels = ref<DockPanel[]>([
  { id: 'terminal', title: 'Terminal' },
  { id: 'diff', title: 'Diff' },
  { id: 'notes', title: 'Notes' },
]);
const close = (id: string) => (panels.value = panels.value.filter((p) => p.id !== id));
</script>

<template>
  <div class="bounded">
    <Dock :panels="panels" @close="close">
      <template #terminal><div class="pad">Terminal panel</div></template>
      <template #diff><div class="pad">Diff panel</div></template>
      <template #notes><div class="pad">Notes panel</div></template>
    </Dock>
  </div>
</template>

<style scoped>
.bounded {
  height: 280px;
}
.pad {
  padding: 8px;
}
</style>
