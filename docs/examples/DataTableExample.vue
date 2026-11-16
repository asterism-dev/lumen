<script setup lang="ts">
import { DataTable, type DataColumn } from '@asterism-dev/lumen/table';

const columns: DataColumn[] = [
  { key: 'id', label: 'ID', align: 'right' },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'size', label: 'Size', align: 'right' },
];
const rows = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `item-${(i * 37) % 50}`,
  size: (i * 13) % 100,
}));
</script>

<template>
  <div class="bounded">
    <DataTable :columns="columns" :rows="rows" row-key="id" />
  </div>
</template>

<style scoped>
.bounded {
  max-height: 320px;
  overflow: auto;
}
</style>
