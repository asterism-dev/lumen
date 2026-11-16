# Table

Plain data table with per-column slots.

```ts
import { Table, type TableColumn } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="TableExample"></div>

```html
--8<-- "examples/TableExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `columns` | `TableColumn[]` | required | `{ key, label, align? }` |
| `rows` | `Row[]` | required |  |
| `rowKey` | `string` | required | Unique key field. |
| `sortState` | `Record<string, 'ascending' \| 'descending'>` | – | Sets `aria-sort`. |
| `hideHeader` | `boolean` | `false` |  |
| `rowClickable` | `(row) => boolean` | – | Rows returning `true` are focusable and emit `row-click` on click and Enter. |

## Notes

Slots: `header-<key>` (`{ column }`), `cell-<key>` (`{ row, value }`) and `empty`. Stop click propagation on interactive cells (`@click.stop`) so they do not trigger `row-click`. For sorting and filtering use [DataTable](data-table.md).
