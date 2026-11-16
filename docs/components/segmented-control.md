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
| `options` | `SegmentOption[]` | required | `{ value, label?, icon?, ariaLabel?, disabled?, title? }`; `title` is the tooltip, e.g. why an option is disabled. |
| `disabled` | `boolean` | `false` | Disables the whole group. |
| `size` | `md` \| `sm` | `md` | `sm` is compact and borderless. |

## Notes

Clicking the active segment keeps it selected. The `option` slot (`{ option, active }`) replaces icon and label.
