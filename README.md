# lumen

Vue 3 component library in the Asterism look.

## Install

```sh
npm i github:asterism-dev/lumen#v0.1.0
```

The `prepare` script builds the package on install. `vue ^3.5` is a required peer. The core depends only on `reka-ui` and `@lucide/vue`; everything else is an optional peer you install per entry.

## Entries

| Entry                          | Exports                                                                                                        | Peers to install                                                                                                               | CSS                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `@asterism-dev/lumen`          | `Button`, `TextInput`, `SegmentedControl`, `Tabs`, `List`, `ListItem`, `Table`, `WorkspaceRail`, `useIsMobile` | none                                                                                                                           | `style.css`                 |
| `@asterism-dev/lumen/table`    | `DataTable`                                                                                                    | `@tanstack/vue-table`                                                                                                          | `style.css`, `table.css`    |
| `@asterism-dev/lumen/markdown` | `renderMarkdown`, `MarkdownView`                                                                               | `markdown-it`, `dompurify`, `highlight.js`                                                                                     | `style.css`, `markdown.css` |
| `@asterism-dev/lumen/editor`   | `CodeEditor`, `MarkdownEditor`, `lumenEditorTheme`, `lumenHighlightStyle`                                      | `codemirror`, `@codemirror/state`, `@codemirror/view`, `@codemirror/language`, `@codemirror/lang-markdown`, `@lezer/highlight` | `style.css`, `editor.css`   |
| `@asterism-dev/lumen/dock`     | `Dock`                                                                                                         | `dockview-vue`                                                                                                                 | `style.css`, `dock.css`     |

`MarkdownEditor` renders Markdown too, so it also needs the peers of `lumen/markdown` and `markdown.css`: import `style.css`, `markdown.css` and `editor.css`.

```ts
import '@asterism-dev/lumen/style.css';
import '@asterism-dev/lumen/markdown.css';
import '@asterism-dev/lumen/editor.css';
import { MarkdownEditor } from '@asterism-dev/lumen/editor';
```

## Theme

All colors and metrics are CSS variables on `:root` (`--bg`, `--panel`, `--text`, `--muted`, `--border`, `--accent`, `--select`, `--danger`, `--hl-*`, `--ws-*`, `--font-ui`, `--radius`, `--on-accent`, ...). Set `data-theme="dark"` on `<html>` for the dark palette. Choosing and persisting the theme is up to the app.

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
- Inputs and editors use `font-size: 16px`.
- Edges respect `env(safe-area-inset-*)`.
- `WorkspaceRail` moves to the bottom.
- `Tabs` scroll horizontally.
- `MarkdownEditor` split stacks vertically.
- `Dock` renders as `Tabs` instead of dockview.

## Behavior notes

- `MarkdownEditor` and `Dock` fill their parent; give the parent a bounded height.
- `MarkdownView` and `MarkdownEditor` never navigate. They emit `open-link(href)` and the app opens the link.
- `Dock` is controlled: `panels` is the source of truth. Closing a tab emits `close(id)`; the app removes the panel. `ready(api)` fires again with a new api after a mobile to desktop remount, so drop the old one.
- `DataTable` treats rows as immutable. Replace the array instead of mutating it.
- `CodeEditor` ships a minimal setup (no search, no autocomplete). Pass the language as a CodeMirror extension, e.g. `:language="javascript()"`.

## Security

lumen sanitizes Markdown and blocks link navigation, but in a Tauri app you should still set a CSP (`img-src` etc.) and a navigation guard (Tauri `on_navigation`) as defense-in-depth. Remote images and the native context-menu "Open Link" are outside lumen's control.

## Demo

`npm run demo` starts a page with all components.

## Release

Conventional commits on `main` trigger CI: commitizen bumps the version, tags `vX.Y.Z` and updates `CHANGELOG.md`.
