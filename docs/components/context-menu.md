# ContextMenu

Right-click (or long-press) menu on the wrapped element, built on reka-ui.

```ts
import { ContextMenu } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="ContextMenuExample"></div>

```html
--8<-- "examples/ContextMenuExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | required | Same items as [Menu](menu.md). |
| `disabled` | `boolean` | `false` |  |

## Notes

Wrap the element the menu belongs to; the menu opens at the pointer.
