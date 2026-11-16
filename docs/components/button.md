# Button

Push button in three tones, plus a borderless ghost variant and a compact size for toolbars, close buttons and chevrons.

```ts
import { Button } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="ButtonExample"></div>

```html
--8<-- "examples/ButtonExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `default` \| `accent` \| `danger` \| `ghost` | `default` | Visual tone. |
| `size` | `md` \| `sm` | `md` | `sm` is the compact toolbar size with a 14px icon. |
| `icon` | `Component` | – | Lucide icon rendered before the label. |
| `type` | `button` \| `submit` \| `reset` | `button` |  |
| `disabled` | `boolean` | `false` |  |

## Notes

A button without slot content is icon-only. Give it an `aria-label`. On phones every button is at least 44px tall, and icon-only buttons are 44px wide.
