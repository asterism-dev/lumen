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
| `items` | `ComboboxOption[]` | required | `{ value, label, disabled?, title? }`, already filtered. `title` is the tooltip, e.g. why an item is disabled. |
| `beforeSelect` | `(value, signal) => Promise` | – | Runs before a pick is committed. While it runs the item shows a spinner; a rejection keeps the panel open and shows its message. Picking again or closing aborts `signal`. |
| `label` | `string` | – | Small caption above the value. |
| `placeholder` | `string` | – | Shown without a value. |
| `searchPlaceholder` | `string` | `Search` |  |
| `loading` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` | Marks the control invalid outside a [Field](field.md). |

## Notes

The combobox does not filter, so async searches and custom matching stay in the app. Slots: `trigger` (`{ value, label, open }`, replaces the trigger; must be a single focusable element), `header` (above the search, e.g. tabs), `search-actions` (next to the search, e.g. refresh), `value` (`{ value, label }`), `item` (`{ item, selected }`) and `empty`.
