# Popover

Floating panel with arbitrary content, anchored to a trigger.

```ts
import { Popover } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="PopoverExample"></div>

```html
--8<-- "examples/PopoverExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model:open` | `boolean` | `false` |  |
| `align` | `start` \| `center` \| `end` | `start` |  |
| `ariaLabel` | `string` | – | Accessible name of the panel. |

## Notes

The default slot is the trigger; `content` is the panel. The panel has no width, so set it on your content. Escape and outside clicks close it.
