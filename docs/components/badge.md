# Badge

Short colored label, e.g. pull request state.

```ts
import { Badge } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="BadgeExample"></div>

```html
--8<-- "examples/BadgeExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `default` \| `muted` \| `success` \| `warning` \| `danger` \| `merged` | `default` |  |
| `variant` | `plain` \| `outline` | `plain` | `outline` is a bordered pill. |
| `as` | `string` | `span` | Element to render, e.g. `a`. |

## Notes

Colors come from `--success`, `--warning`, `--danger`, `--merged` and `--muted`.
