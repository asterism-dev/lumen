<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { ArrowDown, ArrowUp, ArrowUpDown } from '@lucide/vue';
import {
  columnFilteringFeature,
  createFilteredRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table';
import { computed, useSlots } from 'vue';
import Table from '../components/Table.vue';
import type { TableColumn } from '../components/Table.vue';
import TextInput from '../components/TextInput.vue';

export type DataColumn = TableColumn & { sortable?: boolean; filterable?: boolean };
export type SortingState = { id: string; desc: boolean }[];

const props = withDefaults(
  defineProps<{
    columns: DataColumn[];
    rows: Row[];
    rowKey: keyof Row & string;
    filterPlaceholder?: string;
  }>(),
  { filterPlaceholder: 'Filter' },
);

defineSlots<{
  [name: `cell-${string}`]: (props: { row: Row; value: unknown }) => unknown;
  empty?: () => unknown;
}>();

const sorting = defineModel<SortingState>('sorting', { default: () => [] });
const filter = defineModel<string>('filter', { default: '' });
const columnFilters = defineModel<Record<string, string>>('columnFilters', {
  default: () => ({}),
});

const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
});

const compare = (a: unknown, b: unknown) =>
  typeof a === 'number' && typeof b === 'number'
    ? a - b
    : String(a).toLowerCase().localeCompare(String(b).toLowerCase());

const includesText = (value: unknown, needle: string) =>
  String(value ?? '')
    .toLowerCase()
    .includes(needle.toLowerCase());

// Missing values become undefined so sortUndefined: 'last' keeps them last in both directions.
const tableColumns = computed(() =>
  props.columns.map((column) => ({
    id: column.key,
    accessorFn: (row: Row) => row[column.key] ?? undefined,
    enableSorting: column.sortable !== false,
    sortFn: (a: { getValue: (id: string) => unknown }, b: typeof a, id: string) =>
      compare(a.getValue(id), b.getValue(id)),
    sortUndefined: 'last' as const,
    filterFn: (row: { getValue: (id: string) => unknown }, id: string, value: string) =>
      includesText(row.getValue(id), value),
  })),
);

const table = useTable({
  features,
  columns: tableColumns,
  data: computed(() => props.rows),
  globalFilterFn: (row: { getValue: (id: string) => unknown }, id: string, value: string) =>
    includesText(row.getValue(id), value),
  state: computed(() => ({
    sorting: sorting.value,
    globalFilter: filter.value,
    columnFilters: Object.entries(columnFilters.value).map(([id, value]) => ({ id, value })),
  })),
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater;
  },
});

const visibleRows = computed(() => table.getRowModel().rows.map((row) => row.original as Row));

const sortState = computed(() =>
  Object.fromEntries(
    sorting.value.map(({ id, desc }) => [id, desc ? 'descending' : 'ascending'] as const),
  ),
);

function toggleSort(key: string) {
  const current = sorting.value.find((sort) => sort.id === key);
  sorting.value = !current
    ? [{ id: key, desc: false }]
    : current.desc
      ? []
      : [{ id: key, desc: true }];
}

function setColumnFilter(key: string, value: string) {
  const next = { ...columnFilters.value };
  if (value) next[key] = value;
  else delete next[key];
  columnFilters.value = next;
}

const slots = useSlots();
const forwarded = computed(() =>
  Object.keys(slots).filter((name) => name === 'empty' || name.startsWith('cell-')),
);
</script>

<template>
  <div class="lm-data-table">
    <TextInput
      v-model="filter"
      type="search"
      :placeholder="filterPlaceholder"
      :aria-label="filterPlaceholder"
    />
    <Table :columns="columns" :rows="visibleRows" :row-key="rowKey" :sort-state="sortState">
      <template v-for="column in columns" :key="column.key" #[`header-${column.key}`]>
        <button
          v-if="column.sortable !== false"
          type="button"
          class="lm-data-table__sort"
          @click="toggleSort(column.key)"
        >
          {{ column.label }}
          <ArrowUp v-if="sortState[column.key] === 'ascending'" :size="16" :stroke-width="1.75" />
          <ArrowDown
            v-else-if="sortState[column.key] === 'descending'"
            :size="16"
            :stroke-width="1.75"
          />
          <ArrowUpDown v-else :size="16" :stroke-width="1.75" />
        </button>
        <template v-else>{{ column.label }}</template>
        <TextInput
          v-if="column.filterable"
          type="search"
          class="lm-data-table__column-filter"
          :model-value="columnFilters[column.key] ?? ''"
          :aria-label="`Filter ${column.label}`"
          @update:model-value="setColumnFilter(column.key, $event)"
        />
      </template>
      <template v-for="name in forwarded" :key="name" #[name]="slotProps">
        <slot :name="name as `cell-${string}`" v-bind="slotProps" />
      </template>
    </Table>
  </div>
</template>

<style>
@layer lumen {
  .lm-data-table {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .lm-data-table__sort {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    font-weight: inherit;
    cursor: pointer;
  }
  .lm-data-table__sort:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-data-table__column-filter {
    display: block;
    width: 100%;
    margin-top: 4px;
    font-weight: 400;
  }
  @media (max-width: 767.98px) {
    .lm-data-table__sort {
      min-height: 44px;
    }
  }
}
</style>
