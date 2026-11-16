# Switch

On/off toggle for settings, built on reka-ui.

```ts
import { Switch } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="SwitchExample"></div>

```html
--8<-- "examples/SwitchExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `boolean` | required |  |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

Use a switch for settings that apply immediately, and a [Checkbox](checkbox.md) for picking items.

`class` and `style` apply to the surrounding `<label>`, all other attributes to the control. The label is only as wide as its content, also in flex columns and grids, so the empty rest of the row is not clickable.
