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
| `options` | `RadioOption[]` | required | `{ value, label, disabled? }` |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

The `option` slot (`{ option }`) replaces the label text, for example with a color swatch.
