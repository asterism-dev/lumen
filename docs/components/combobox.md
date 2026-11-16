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
| `items` | `ComboboxOption[]` | required | `{ value, label }`, already filtered. |
| `label` | `string` | – | Small caption above the value. |
| `placeholder` | `string` | – | Shown without a value. |
| `searchPlaceholder` | `string` | `Search` |  |
| `loading` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |

## Notes

The combobox does not filter, so async searches and custom matching stay in the app. Slots: `header` (above the search, e.g. tabs), `search-actions` (next to the search, e.g. refresh), `value` (`{ value, label }`), `item` (`{ item, selected }`) and `empty`.
