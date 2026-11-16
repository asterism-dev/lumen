# Select

Native `<select>` in the lumen look. Phones get the system picker.

```ts
import { Select } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="SelectExample"></div>

```html
--8<-- "examples/SelectExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string \| number \| null` | required | The option value keeps its type. |
| `options` | `SelectOption[]` | required | `{ value, label, disabled? }` |
| `placeholder` | `string` | – | Shown while the value is `null`; not selectable. |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

Give it an `aria-label` or wrap it in a `<label>`.
