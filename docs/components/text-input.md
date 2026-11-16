# TextInput

Single-line text field.

```ts
import { TextInput } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="TextInputExample"></div>

```html
--8<-- "examples/TextInputExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `type` | `text` \| `search` \| `password` | `text` |  |
| `placeholder` | `string` | – |  |
| `disabled` | `boolean` | `false` |  |

## Notes

Other attributes (`aria-label`, `autocomplete`, `spellcheck`, …) go to the `<input>`. For numbers use [NumberInput](number-input.md).
