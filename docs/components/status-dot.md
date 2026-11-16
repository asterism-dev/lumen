# StatusDot

Small status dot for session states.

```ts
import { StatusDot } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="StatusDotExample"></div>

```html
--8<-- "examples/StatusDotExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `none` \| `idle` \| `waiting` \| `exited` \| `accent` | `none` | `none` is a hollow ring. |
| `label` | `string` | required | Accessible name (`role="img"`). |

## Notes

Animated states such as Asterism's "working" stars stay in the app.
