# CodeEditor

CodeMirror 6 editor with the lumen theme. Needs the CodeMirror peers and `editor.css`.

```ts
import { CodeEditor } from '@asterism-dev/lumen/editor';
```

<div class="lumen-preview" data-example="CodeEditorExample"></div>

```html
--8<-- "examples/CodeEditorExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required |  |
| `language` | `Extension` | – | e.g. `javascript()` |
| `readonly` | `boolean` | `false` |  |
| `lineNumbers` | `boolean` | `true` |  |

## Notes

Minimal setup: no search, no autocomplete.
