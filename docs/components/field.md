# Field & validation

`Field` wraps one input with a label, a hint and an error message. Validation is optional: without `rules` or `error` a field is just a label.

```ts
import { Field, Form, required, min, max, minLength, maxLength, pattern } from '@asterism-dev/lumen';
```

<div class="lumen-preview" data-example="FieldExample"></div>

```html
--8<-- "examples/FieldExample.vue"
```

Submit the empty form to see every error at once. Try `main` as branch name for an error that comes from the app instead of a rule.

## Field props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | – | Linked to the control via `for`/`id`. |
| `hint` | `string` | – | Muted help text, linked via `aria-describedby`. |
| `rules` | `Rule[]` | – | Checked in order; the first failing message is shown. |
| `error` | `string` | – | Error from the app, e.g. from the server. Shown immediately and wins over rules. |

`validate()` is exposed: it marks the field as touched and returns whether it is valid.

## Rules

A rule is a function `(value) => true | string`. Return `true` when the value is fine, or the message to show.

| Rule | Fails when |
| --- | --- |
| `required(message?)` | value is `''`, `null`, `undefined`, `false` or `[]` |
| `min(n, message?)` / `max(n, message?)` | number is below / above `n` |
| `minLength(n, message?)` / `maxLength(n, message?)` | text is shorter / longer than `n` |
| `pattern(regex, message?)` | text does not match |

All rules except `required` pass empty values, so combine them with `required()` for mandatory fields. Custom rules are plain functions:

```ts
const notMain = (value: string) => value !== 'main' || 'Pick a different branch';
```

## When errors show

- Rule errors appear once the field loses focus for the first time, then update while typing.
- Opening a popover from the field (e.g. `Combobox`) does not count as leaving it.
- An `error` from the app shows immediately.
- `Form` marks all fields as touched on submit.

## Form

`Form` is a `<form>` that validates all fields inside it on submit. It emits `submit` only when every field is valid. Use the exposed `validate()` when the submit button lives outside the form, e.g. in a [Dialog](dialog.md) `actions` slot:

```vue
<Dialog v-model:open="open" title="New task">
  <Form ref="form">…fields…</Form>
  <template #actions>
    <Button variant="accent" @click="form?.validate() && create()">Create</Button>
  </template>
</Dialog>
```

## Supported controls

`TextInput`, `NumberInput`, `Textarea`, `Select`, `Checkbox`, `Switch`, `RadioGroup` and `Combobox` connect to the surrounding `Field`. Each one gets `aria-invalid`, `aria-describedby` and a red border while invalid. Outside a `Field`, set the `invalid` prop to mark a control by hand.

!!! note
    Native attributes like `required` or `pattern` make the browser block the submit before `Form` runs. Use lumen rules instead of native attributes inside a `Form`.
