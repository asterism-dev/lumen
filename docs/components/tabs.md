# Tabs

Tab strip with one slot per tab, optionally closable.

```ts
import { Tabs, type TabItem } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="TabsExample"></div>

```html
--8<-- "examples/TabsExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required | Active tab. |
| `tabs` | `TabItem[]` | required | `{ value, label, icon? }` |
| `closable` | `boolean` | `false` | Shows a close button that emits `close(value)`. |
| `keepMounted` | `boolean` | `false` | Keep inactive panels mounted. |

## Notes

Each tab renders the slot named after its `value`. On phones the strip scrolls horizontally.
