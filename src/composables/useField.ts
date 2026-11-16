import { computed, inject, type ComputedRef, type InjectionKey } from 'vue';

export interface FieldContext {
  id: string;
  labelId: string;
  describedBy: ComputedRef<string | undefined>;
  invalid: ComputedRef<boolean>;
  register: (getValue: () => unknown) => void;
}

export interface FormContext {
  add: (validate: () => boolean) => void;
  remove: (validate: () => boolean) => void;
}

export const fieldKey: InjectionKey<FieldContext> = Symbol('lumen-field');
export const formKey: InjectionKey<FormContext> = Symbol('lumen-form');

// Connects a control to its surrounding Field, if any
export function useFieldControl(getValue: () => unknown, invalidProp: () => boolean | undefined) {
  const field = inject(fieldKey, null);
  field?.register(getValue);
  const invalid = computed(() => !!invalidProp() || !!field?.invalid.value);
  return {
    invalid,
    attrs: computed(() => ({
      id: field?.id,
      'aria-describedby': field?.describedBy.value,
      'aria-invalid': invalid.value || undefined,
      class: { 'lm-invalid': invalid.value },
    })),
    labelId: field?.labelId,
  };
}
