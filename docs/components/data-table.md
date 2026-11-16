# DataTable

Sortable, filterable table on top of TanStack Table. Needs the peer `@tanstack/vue-table` and `table.css`.

```ts
import { DataTable, type DataColumn } from '@asterism-dev/lumen/table';
```

<div class="lumen-preview" data-example="DataTableExample"></div>

```html
--8<-- "examples/DataTableExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `columns` | `DataColumn[]` | required | `TableColumn` plus `sortable?` and `filterable?` |
| `rows` | `Row[]` | required | Treated as immutable, so replace the array. |
| `rowKey` | `string` | required |  |
| `v-model:sorting` | `SortingState` | `[]` |  |
| `v-model:filter` | `string` | `''` | Global filter. |
| `v-model:columnFilters` | `Record<string, string>` | `{}` |  |
| `filterPlaceholder` | `string` | `Filter` |  |
