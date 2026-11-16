# lumen

Vue 3 component library in the Asterism look.

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

## Behavior notes

- `MarkdownEditor` and `Dock` fill their parent; give the parent a bounded height.
- `MarkdownView` and `MarkdownEditor` never navigate. They emit `open-link(href)` and the app opens the link.
- `Dock` is controlled: `panels` is the source of truth. Closing a tab emits `close(id)`; the app removes the panel. `ready(api)` fires again with a new api after a mobile to desktop remount, so drop the old one.
- `DataTable` treats rows as immutable. Replace the array instead of mutating it.
- `Select` is a native `<select>` so phones get the system picker. Option values keep their type (`string` or `number`).
- `NumberInput` emits a `number`, or `null` while the field is empty.
- `Dialog` is controlled: Escape and backdrop clicks emit `update:open(false)`; ignore it to keep the dialog open (e.g. while busy). Use `@open-auto-focus` to focus a specific element.
- `Combobox` does not filter. Bind `v-model:search` and pass the matching `items`; search resets when it opens. Use the `header` slot for tabs and `search-actions` for a refresh button.
- `ContextMenu` wraps the element it belongs to; right-click (or long-press) opens it at the pointer.
- `Checkbox`, `Switch` and `RadioGroup` render their own `<label>`; pass the label text as slot content, or `aria-label` without one.
- `Table` rows are clickable only where `rowClickable(row)` returns true; they then emit `row-click` on click and Enter.
- `Tooltip` brings its own provider, so it works without app setup. It does not show on touch devices; don't put essential information in it.
- `CodeEditor` ships a minimal setup (no search, no autocomplete). Pass the language as a CodeMirror extension, e.g. `:language="javascript()"`.

## Security

lumen sanitizes Markdown and blocks link navigation, but in a Tauri app you should still set a CSP (`img-src` etc.) and a navigation guard (Tauri `on_navigation`) as defense-in-depth. Remote images and the native context-menu "Open Link" are outside lumen's control.

## Demo

`npm run demo` starts a page with all components.

## Release

Conventional commits on `main` trigger CI: commitizen bumps the version, tags `vX.Y.Z` and updates `CHANGELOG.md`.
