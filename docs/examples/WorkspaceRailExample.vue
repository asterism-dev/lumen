<script setup lang="ts">
import { ref } from 'vue';
import { WorkspaceRail, type WorkspaceItem } from '@asterism-dev/lumen';

const workspaces: WorkspaceItem[] = [
  { id: 'w1', name: 'Asterism', label: 'A', color: 'blue' },
  { id: 'w2', name: 'Backend', label: 'B', color: 'green', waiting: 2 },
  { id: 'w3', name: 'Garden', label: 'G', color: 'purple' },
];
const active = ref<string | null>('w1');
</script>

<template>
  <div class="rail">
    <WorkspaceRail :workspaces="workspaces" :active="active" @select="active = $event" />
  </div>
</template>

<style scoped>
.rail {
  display: flex;
  height: 180px;
}
</style>
