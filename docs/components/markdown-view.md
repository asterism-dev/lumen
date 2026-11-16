# MarkdownView

Sanitized Markdown renderer with syntax highlighting. Needs `markdown-it`, `dompurify`, `highlight.js` and `markdown.css`.

```ts
import { MarkdownView } from '@asterism-dev/lumen/markdown';
```

<div class="lumen-preview" data-example="MarkdownViewExample"></div>

```html
--8<-- "examples/MarkdownViewExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `source` | `string` | required |  |

## Notes

Links emit `open-link(href)` instead of navigating. `renderMarkdown(source)` is exported for plain HTML.
