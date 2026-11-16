# Menu

Dropdown menu opened from a trigger, built on reka-ui.

```ts
import { Menu, type MenuItem } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="MenuExample"></div>

```html
--8<-- "examples/MenuExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | required | `{ label, action, icon?, iconProps?, danger?, checked?, disabled?, title? }`; `iconProps` are passed to `icon`, `title` is the tooltip. |
| `align` | `start` \| `center` \| `end` | `start` |  |
| `v-model:open` | `boolean` | `false` |  |

## Notes

The default slot is the trigger and must be a single focusable element. A check column appears as soon as one item has `checked` set.
