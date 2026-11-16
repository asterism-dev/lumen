# Tooltip

Hover and focus hint, built on reka-ui.

```ts
import { Tooltip } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="TooltipExample"></div>

```html
--8<-- "examples/TooltipExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `text` | `string` | required |  |

## Notes

Tooltips do not show on touch devices, so never put essential information in them. Icon-only buttons still need an `aria-label`. Each tooltip brings its own provider, so no app setup is required.
