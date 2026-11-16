<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox, StatusDot, Table } from '@asterism-dev/lumen';

const columns = [
  { key: 'pick', label: '' },
  { key: 'name', label: 'Process', class: 'mono' },
  { key: 'memory', label: 'Memory', align: 'right' as const },
];
const rows = [
  { id: 'a', name: 'claude', memory: '312 MB', session: true },
  { id: 'b', name: 'git fetch', memory: '18 MB', session: false },
];
const picked = ref<string[]>([]);
const opened = ref('nothing yet');

function toggle(id: string, value: boolean | 'indeterminate') {
  picked.value = value === true ? [...picked.value, id] : picked.value.filter((p) => p !== id);
}
</script>

<template>
  <div class="stack">
    <Table
      :columns="columns"
      :rows="rows"
      row-key="id"
      :row-clickable="(row) => row.session"
      @row-click="(row) => (opened = row.name)"
    >
      <template #cell-pick="{ row }">
        <Checkbox
          :model-value="picked.includes(row.id)"
          :aria-label="`Select ${row.name}`"
          @click.stop
          @update:model-value="toggle(row.id, $event)"
        />
      </template>
      <template #cell-name="{ row }">
        {{ row.name }} <StatusDot v-if="row.session" tone="idle" label="Idle" />
      </template>
      <template #footer-name>Total</template>
      <template #footer-memory>330 MB</template>
    </Table>
    <span>Opened: {{ opened }}</span>
  </div>
</template>

<style>
.lumen-preview .mono {
  font-family: ui-monospace, monospace;
}
</style>
