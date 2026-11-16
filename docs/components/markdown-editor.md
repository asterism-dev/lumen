# MarkdownEditor

Markdown source editor with preview and split mode. Needs the peers of both `lumen/editor` and `lumen/markdown`.

```ts
import { MarkdownEditor } from '@asterism-dev/lumen/editor';
```

<div class="lumen-preview" data-example="MarkdownEditorExample"></div>

```html
--8<-- "examples/MarkdownEditorExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `v-model:mode` | `edit` \| `view` \| `split` | `edit` |  |

## Notes

Fills its parent, so give the parent a height. Links emit `open-link(href)` instead of navigating. Split mode stacks vertically on phones.
