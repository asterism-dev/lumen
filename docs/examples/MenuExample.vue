<script setup lang="ts">
import { MoreHorizontal, Pencil, Trash2 } from '@lucide/vue';
import { ref } from 'vue';
import { Button, Menu, type MenuItem } from '@asterism-dev/lumen';

const last = ref('nothing yet');
const pinned = ref(false);
const items = (): MenuItem[] => [
  { label: 'Rename', icon: Pencil, action: () => (last.value = 'rename') },
  { label: 'Pinned', checked: pinned.value, action: () => (pinned.value = !pinned.value) },
  { label: 'Delete', icon: Trash2, danger: true, action: () => (last.value = 'delete') },
];
</script>

<template>
  <div class="row">
    <Menu :items="items()">
      <Button variant="ghost" :icon="MoreHorizontal" aria-label="More actions" />
    </Menu>
    <span>Last action: {{ last }}</span>
  </div>
</template>
