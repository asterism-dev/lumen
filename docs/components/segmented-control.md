# SegmentedControl

Button group with exactly one active segment.

```ts
import { SegmentedControl } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="SegmentedControlExample"></div>

```html
--8<-- "examples/SegmentedControlExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `options` | `SegmentOption[]` | required | `{ value, label?, icon?, ariaLabel? }` |

## Notes

Clicking the active segment keeps it selected.
