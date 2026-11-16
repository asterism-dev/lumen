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
| `title` | `string` | required | Visible title, also the accessible name. |
| `description` | `string` | – | Muted text below the title, linked via `aria-describedby`. |
| `width` | `string` | `460px` | Desktop width. |

## Notes

The dialog is controlled. Escape and backdrop clicks emit `update:open(false)`; ignore it to keep the dialog open, as the example does while busy. The default slot is the body, `actions` is the right-aligned button row. `@open-auto-focus` lets you focus a specific element; call `event.preventDefault()` and focus it yourself.
