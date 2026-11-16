# List

Selectable list with keyboard navigation.

```ts
import { List, ListItem } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="ListExample"></div>

```html
--8<-- "examples/ListExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string \| null` | required |  |
| `ariaLabel` | `string` | – |  |
| `ListItem value` | `string` | required |  |
| `ListItem disabled` | `boolean` | `false` |  |
