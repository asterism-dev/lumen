# Checkbox

Checkbox with an indeterminate state, built on reka-ui.

```ts
import { Checkbox } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="CheckboxExample"></div>

```html
--8<-- "examples/CheckboxExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `boolean \| 'indeterminate'` | required |  |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

The slot is the label, and the whole row is clickable. Without a label, pass `aria-label`; it lands on the checkbox itself. On phones the hit area is at least 44px.

`class` and `style` apply to the surrounding `<label>`, all other attributes to the control.
