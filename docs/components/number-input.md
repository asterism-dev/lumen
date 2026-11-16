# NumberInput

Numeric field that emits numbers instead of strings.

```ts
import { NumberInput } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="NumberInputExample"></div>

```html
--8<-- "examples/NumberInputExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `number \| null` | required | `null` while the field is empty. |
| `placeholder` | `string` | – |  |
| `disabled` | `boolean` | `false` |  |

## Notes

`min`, `max` and `step` pass through to the native `<input type="number">`.
