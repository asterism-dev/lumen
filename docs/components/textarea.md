# Textarea

Multi-line text field, resizable vertically.

```ts
import { Textarea } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="TextareaExample"></div>

```html
--8<-- "examples/TextareaExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `rows` | `number` | `3` |  |
| `placeholder` | `string` | – |  |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

Add your own class for variants such as a monospace JSON editor.
