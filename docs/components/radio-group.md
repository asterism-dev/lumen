# RadioGroup

Single choice from a few options, built on reka-ui. Arrow keys move between options.

```ts
import { RadioGroup } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="RadioGroupExample"></div>

```html
--8<-- "examples/RadioGroupExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `options` | `RadioOption[]` | required | `{ value, label, disabled?, title? }` |
| `variant` | `radio` \| `custom` | `radio` | `custom` drops the radio dot; the `option` slot is the whole item and `label` its accessible name. |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

The `option` slot (`{ option, checked }`) replaces the label text. With `variant="custom"` it renders inside the radio itself, for example a color swatch; the checked one gets an accent ring.
