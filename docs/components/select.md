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
| `v-model` | `string \| number` | required | The option value keeps its type. |
| `options` | `SelectOption[]` | required | `{ value, label, disabled? }` |
| `disabled` | `boolean` | `false` |  |

## Notes

Give it an `aria-label` or wrap it in a `<label>`.
