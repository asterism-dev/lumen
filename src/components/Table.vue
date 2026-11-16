<!-- Record<string, any> (not unknown) so interfaces like `Task` are accepted as rows -->
<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script setup lang="ts" generic="Row extends Record<string, any>">
export type TableColumn = { key: string; label: string; align?: 'left' | 'right'; class?: string };

defineProps<{
  columns: TableColumn[];
  rows: Row[];
  rowKey: keyof Row & string;
  sortState?: Record<string, 'ascending' | 'descending'>;
  hideHeader?: boolean;
  rowClickable?: (row: Row) => boolean;
  // 'clickable' limits the hover highlight to rows where rowClickable is true
  hover?: 'all' | 'clickable';
  size?: 'md' | 'sm';
  borderless?: boolean;
  valign?: 'middle' | 'top';
}>();

defineEmits<{ 'row-click': [row: Row] }>();

defineSlots<{
  [name: `header-${string}`]: (props: { column: TableColumn }) => unknown;
  [name: `cell-${string}`]: (props: { row: Row; value: unknown }) => unknown;
  [name: `footer-${string}`]: (props: { column: TableColumn }) => unknown;
  empty?: () => unknown;
}>();
</script>

<template>
  <div class="lm-table-wrap">
    <table
      class="lm-table"
      :class="{
        'lm-table--sm': size === 'sm',
        'lm-table--borderless': borderless,
        'lm-table--top': valign === 'top',
      }"
    >
      <thead v-if="!hideHeader">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="lm-table__th"
            :class="[{ 'lm-table__th--right': column.align === 'right' }, column.class]"
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
          :class="{ 'lm-table__row--hover': hover !== 'clickable' }"
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
            :class="[{ 'lm-table__td--right': column.align === 'right' }, column.class]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{
              row[column.key] ?? ''
            }}</slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="Object.keys($slots).some((name) => name.startsWith('footer-'))">
        <tr>
          <td
            v-for="column in columns"
            :key="column.key"
            class="lm-table__td lm-table__foot"
            :class="[{ 'lm-table__td--right': column.align === 'right' }, column.class]"
          >
            <slot :name="`footer-${column.key}`" :column="column" />
          </td>
        </tr>
      </tfoot>
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
  .lm-table__foot {
    font-weight: 600;
    border-bottom: 0;
  }
  .lm-table__row--hover:hover,
  .lm-table__row--clickable:hover {
    background: var(--select);
  }
  .lm-table__row--clickable {
    cursor: pointer;
  }
  .lm-table__row--clickable:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-table--sm .lm-table__th {
    font-size: 12px;
  }
  .lm-table--sm .lm-table__th,
  .lm-table--sm .lm-table__td {
    padding: 6px 8px;
  }
  .lm-table--borderless .lm-table__th,
  .lm-table--borderless .lm-table__td {
    border-bottom: 0;
  }
  .lm-table--top .lm-table__td {
    vertical-align: top;
  }
  .lm-table__empty {
    padding: 16px 10px;
    color: var(--muted);
    text-align: center;
  }
  @media (max-width: 767.98px) {
    .lm-table .lm-table__th,
    .lm-table .lm-table__td {
      padding-block: 12px;
    }
  }
}
</style>
