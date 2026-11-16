# Dialog

Modal dialog with focus trap, built on reka-ui. On phones it becomes a full-screen sheet.

```ts
import { Dialog } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="DialogExample"></div>

```html
--8<-- "examples/DialogExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model:open` | `boolean` | required |  |
| `title` | `string` | – | Visible title, also the accessible name. Use the `title` slot for rich content. |
| `description` | `string` | – | Muted text below the title, linked via `aria-describedby`. |
| `width` | `string` | `460px` | Desktop width. |
| `closable` | `boolean` | `false` | Shows a close button in the header. |

## Notes

The dialog is controlled. Escape and backdrop clicks emit `update:open(false)`; ignore it to keep the dialog open, as the example does while busy. The `title` slot replaces the `title` prop and stays the accessible name, e.g. `Create Task in <Select />`. The default slot is the body, `actions` is the right-aligned button row. `@open-auto-focus` lets you focus a specific element; call `event.preventDefault()` and focus it yourself.
