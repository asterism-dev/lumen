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
| `label` | `string` | – | Accessible name (`role="img"`). Without it the dot is decorative (`aria-hidden`); use that only when nearby text already states the status. |

## Notes

Animated states such as Asterism's "working" stars stay in the app.
