<script setup lang="ts" generic="Row extends Record<string, unknown>">
export type TableColumn = { key: string; label: string; align?: 'left' | 'right' };

defineProps<{
  columns: TableColumn[];
  rows: Row[];
  rowKey: keyof Row & string;
  sortState?: Record<string, 'ascending' | 'descending'>;
  hideHeader?: boolean;
  rowClickable?: (row: Row) => boolean;
}>();

defineEmits<{ 'row-click': [row: Row] }>();

defineSlots<{
  [name: `header-${string}`]: (props: { column: TableColumn }) => unknown;
  [name: `cell-${string}`]: (props: { row: Row; value: unknown }) => unknown;
  empty?: () => unknown;
}>();
</script>

<template>
  <div class="lm-table-wrap">
    <table class="lm-table">
      <thead v-if="!hideHeader">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="lm-table__th"
            :class="{ 'lm-table__th--right': column.align === 'right' }"
            :aria-sort="sortState?.[column.key]"
          >
            <slot :name="`header-${column.key}`" :column="column">{{ column.label }}</slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0 && $slots.empty">
          <td class="lm-table__empty" :colspan="columns.length">
            <slot name="empty" />
          </td>
        </tr>
        <tr
          v-for="row in rows"
          :key="String(row[rowKey])"
          class="lm-table__row"
          v-bind="
            rowClickable?.(row)
              ? {
                  class: 'lm-table__row--clickable',
                  tabindex: 0,
                  onClick: () => $emit('row-click', row),
                  onKeydown: (e: KeyboardEvent) => e.key === 'Enter' && $emit('row-click', row),
                }
              : {}
          "
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="lm-table__td"
            :class="{ 'lm-table__td--right': column.align === 'right' }"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{
              row[column.key] ?? ''
            }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@layer lumen {
  .lm-table-wrap {
    overflow-x: auto;
    max-width: 100%;
  }
  .lm-table {
    width: 100%;
    border-collapse: collapse;
    font: var(--font-ui);
    color: var(--text);
  }
  .lm-table__th {
    padding: 6px 10px;
    border-bottom: 1px solid var(--border);
    color: var(--muted);
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }
  .lm-table__td {
    padding: 6px 10px;
    border-bottom: 1px solid var(--border);
  }
  .lm-table__th--right,
  .lm-table__td--right {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .lm-table__row:hover {
    background: var(--select);
  }
  .lm-table__row--clickable {
    cursor: pointer;
  }
  .lm-table__row--clickable:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-table__empty {
    padding: 16px 10px;
    color: var(--muted);
    text-align: center;
  }
  @media (max-width: 767.98px) {
    .lm-table__th,
    .lm-table__td {
      padding-block: 12px;
    }
  }
}
</style>
