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
| `variant` | `boxed` \| `underline` | `boxed` | `underline` is lighter, e.g. for settings pages. |

## Notes

Each tab renders the slot named after its `value`. Tabs without such a slot get no panel, so you can use the tab strip alone and render the content yourself. The `tab` slot (`{ tab, active }`) replaces icon and label, e.g. to add a count; the `end` slot sits at the right end of the strip. `aria-label` and `aria-labelledby` go to the tab list, other attributes to the root. On phones the strip scrolls horizontally.
