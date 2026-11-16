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
| `columns` | `TableColumn[]` | required | `{ key, label, align?, class? }`; `class` goes on every cell of the column. |
| `rows` | `Row[]` | required |  |
| `rowKey` | `string` | required | Unique key field. |
| `sortState` | `Record<string, 'ascending' \| 'descending'>` | – | Sets `aria-sort`. |
| `hideHeader` | `boolean` | `false` |  |
| `rowClickable` | `(row) => boolean` | – | Rows returning `true` are focusable and emit `row-click` on click and Enter. |
| `hover` | `all` \| `clickable` | `all` | `clickable` highlights only rows where `rowClickable` returns `true`. |
| `size` | `md` \| `sm` | `md` | `sm`: 12px header, 6px 8px cells. |
| `borderless` | `boolean` | `false` | Drops the row separators. |
| `valign` | `middle` \| `top` | `middle` | Vertical alignment of body cells, `top` for multi-line rows. |

## Notes

Slots: `header-<key>` (`{ column }`), `cell-<key>` (`{ row, value }`), `footer-<key>` (`{ column }`, renders a `<tfoot>` row, e.g. totals) and `empty`. Stop click propagation on interactive cells (`@click.stop`) so they do not trigger `row-click`. For sorting and filtering use [DataTable](data-table.md).

Cells are rendered by the table, so scoped styles for a column `class` need `:deep()`:

```css
.tasks :deep(.num) {
  white-space: nowrap;
}
```

lumen's styles sit in `@layer lumen`, so app styles always win without extra specificity. On phones cells keep 12px vertical padding in every size for touch.
