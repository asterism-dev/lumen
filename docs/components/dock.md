# Dock

Dockable tab panels on top of dockview. Needs `dockview-vue` and `dock.css`.

```ts
import { Dock, type DockPanel } from '@asterism-dev/lumen/dock';
```

<div class="lumen-preview" data-example="DockExample"></div>

```html
--8<-- "examples/DockExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `panels` | `DockPanel[]` | required | `{ id, title, icon? }`, the source of truth. |
| `v-model:active` | `string \| null` | `null` |  |

## Notes

Closing a tab emits `close(id)` and the app removes the panel. `ready(api)` fires again after a mobile-to-desktop remount. Renders as [Tabs](tabs.md) on phones. Fills its parent.
