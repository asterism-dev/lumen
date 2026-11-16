# Combobox

Searchable picker: a field button that opens a popover with a search input and a keyboard-navigable list.

```ts
import { Combobox } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="ComboboxExample"></div>

```html
--8<-- "examples/ComboboxExample.vue"
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `v-model` | `string` | required | Selected value, `''` for none. |
| `v-model:search` | `string` | `''` | Reset to `''` whenever the popover opens. |
| `v-model:open` | `boolean` | `false` |  |
| `items` | `ComboboxOption[]` | required | `{ value, label, disabled?, title?, class?, data? }`, already filtered. `title` is the tooltip, e.g. why an item is disabled. `class` goes on the item row, `data` is passed through to the `item` slot, e.g. the search hit behind the option. |
| `beforeSelect` | `(value, signal) => Promise<R>` | – | Runs before a pick is committed. While it runs the item shows a spinner; a rejection keeps the panel open and shows its message (or the `error` slot). Picking again or closing aborts `signal`. |
| `label` | `string` | – | Small caption above the value. |
| `placeholder` | `string` | – | Shown without a value. |
| `searchPlaceholder` | `string` | `Search` |  |
| `loading` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

The combobox does not filter, so async searches and custom matching stay in the app. Slots: `trigger` (`{ value, label, open }`, replaces the trigger; must be a single focusable element), `header` (above the search, e.g. tabs), `search-start` (before the search input, e.g. a provider menu), `search-actions` (after the search, e.g. refresh), `value` (`{ value, label }`), `item` (`{ item, selected }`), `error` (`{ error }`, the raw `beforeSelect` rejection, e.g. to add an "Open settings" button) and `empty`.

Events: `select(value, result)` fires after each commit with what `beforeSelect` resolved to (`undefined` without `beforeSelect`), so the app does not need to cache loaded details itself.

The item row is rendered by the combobox, so scoped styles for an item `class` need `:deep()`, e.g. `.picker :deep(.top) { align-items: flex-start; }`. The panel is portaled, so put the class on an element inside your component that contains the combobox, or use a non-scoped style.
