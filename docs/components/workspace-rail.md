# WorkspaceRail

Vertical workspace switcher. Moves to the bottom on phones.

```ts
import { WorkspaceRail, type WorkspaceItem } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="WorkspaceRailExample"></div>

```html
--8<-- "examples/WorkspaceRailExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `workspaces` | `WorkspaceItem[]` | required | `{ id, name, label, color?, waiting? }` |
| `active` | `string \| null` | required |  |

## Notes

Emits `select(id)`, `add()` and `contextmenu(id, event)`.
