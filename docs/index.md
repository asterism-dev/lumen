# lumen

Vue 3 component library in the Asterism look. Every component page shows a live example and the exact code that renders it.

## Install

```sh
npm i github:asterism-dev/lumen#v0.1.0
```

The `prepare` script builds the package on install. `vue ^3.5` is a required peer. The core depends only on `reka-ui` and `@lucide/vue`; everything else is an optional peer you install per entry.

Installing with `--ignore-scripts` skips `prepare`, so there is no `dist` and the entries will not resolve. pnpm may require allowing the git dependency's build scripts (`pnpm.onlyBuiltDependencies` or `pnpm approve-builds`).

## Entries

| Entry                          | Exports                                                                                                                                                                                                                                                                                 | Peers to install                                                                                                               | CSS                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `@asterism-dev/lumen`          | `Button`, `TextInput`, `NumberInput`, `Textarea`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, `SegmentedControl`, `Combobox`, `Dialog`, `Menu`, `ContextMenu`, `Popover`, `Tooltip`, `Tabs`, `List`, `ListItem`, `Table`, `Badge`, `Kbd`, `StatusDot`, `WorkspaceRail`, `useIsMobile` | none                                                                                                                           | `style.css`                 |
| `@asterism-dev/lumen/table`    | `DataTable`                                                                                                                                                                                                                                                                             | `@tanstack/vue-table`                                                                                                          | `style.css`, `table.css`    |
| `@asterism-dev/lumen/markdown` | `renderMarkdown`, `MarkdownView`                                                                                                                                                                                                                                                        | `markdown-it`, `dompurify`, `highlight.js`                                                                                     | `style.css`, `markdown.css` |
| `@asterism-dev/lumen/editor`   | `CodeEditor`, `MarkdownEditor`, `lumenEditorTheme`, `lumenHighlightStyle`                                                                                                                                                                                                               | `codemirror`, `@codemirror/state`, `@codemirror/view`, `@codemirror/language`, `@codemirror/lang-markdown`, `@lezer/highlight` | `style.css`, `editor.css`   |
| `@asterism-dev/lumen/dock`     | `Dock`                                                                                                                                                                                                                                                                                  | `dockview-vue`                                                                                                                 | `style.css`, `dock.css`     |

`MarkdownEditor` renders Markdown too, so it also needs the peers of `lumen/markdown` and `markdown.css`: import `style.css`, `markdown.css` and `editor.css`.

```ts
import '@asterism-dev/lumen/style.css';
import '@asterism-dev/lumen/markdown.css';
import '@asterism-dev/lumen/editor.css';
import { MarkdownEditor } from '@asterism-dev/lumen/editor';
```

## Theme

All colors and metrics are CSS variables on `:root` (`--bg`, `--panel`, `--text`, `--muted`, `--border`, `--accent`, `--select`, `--danger`, `--success`, `--warning`, `--merged`, `--hl-*`, `--ws-*`, `--font-ui`, `--radius`, `--on-accent`, ...). Set `data-theme="dark"` on `<html>` for the dark palette. Choosing and persisting the theme is up to the app.

## Overriding styles

All lumen CSS lives in `@layer lumen`. Styles in your app that are not in a layer always win against it, regardless of selector specificity:

```css
.lm-button {
  border-radius: 0;
}
```

## Mobile

At `max-width: 767.98px` (also exposed as `useIsMobile()`):

- Clickable elements are at least 44px tall.
- Inputs, selects, textareas and editors use `font-size: 16px`.
- `Dialog` becomes a full-screen sheet that respects `env(safe-area-inset-*)`.
- `Kbd` is hidden.
- `WorkspaceRail` respects `env(safe-area-inset-*)` on its left, right and bottom edges.
- Tab-strip icons are 14px to match Asterism's tabs.
- `WorkspaceRail` moves to the bottom.
- `Tabs` scroll horizontally.
- `MarkdownEditor` split stacks vertically.
- `Dock` renders as `Tabs` instead of dockview.

## Security

lumen sanitizes Markdown and blocks link navigation, but in a Tauri app you should still set a CSP (`img-src` etc.) and a navigation guard (Tauri `on_navigation`) as defense-in-depth. Remote images and the native context-menu "Open Link" are outside lumen's control.
