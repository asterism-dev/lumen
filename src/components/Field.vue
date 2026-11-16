<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref, shallowRef, useId } from 'vue';
import { fieldKey, formKey } from '../composables/useField';
import type { Rule } from '../validation';

const props = defineProps<{ label?: string; hint?: string; error?: string; rules?: Rule[] }>();

const id = useId();
const labelId = `${id}-label`;
const hintId = `${id}-hint`;
const errorId = `${id}-error`;

// A shallowRef so rules re-run once the control registers after the first render
const getValue = shallowRef<() => unknown>(() => undefined);
const touched = ref(false);

const ruleError = computed(() => {
  const value = getValue.value();
  for (const rule of props.rules ?? []) {
    const result = rule(value);
    if (result !== true) return result;
  }
  return '';
});
const message = computed(() => props.error || (touched.value ? ruleError.value : ''));
const describedBy = computed(
  () => [props.hint && hintId, message.value && errorId].filter(Boolean).join(' ') || undefined,
);

provide(fieldKey, {
  id,
  labelId,
  describedBy,
  invalid: computed(() => !!message.value),
  register: (fn) => (getValue.value = fn),
});

function validate() {
  touched.value = true;
  return !props.error && !ruleError.value;
}

function onFocusout(event: FocusEvent) {
  // Opening a popover (Combobox, Select menu) moves focus out without leaving the field
  const next = event.relatedTarget as Element | null;
  if (next?.closest('[data-reka-popper-content-wrapper]')) return;
  touched.value = true;
}

const form = inject(formKey, null);
onMounted(() => form?.add(validate));
onUnmounted(() => form?.remove(validate));

defineExpose({ validate });
</script>

<template>
  <div class="lm-field" @focusout="onFocusout">
    <label v-if="label" :id="labelId" :for="id" class="lm-field__label">{{ label }}</label>
    <slot />
    <p v-if="hint" :id="hintId" class="lm-field__hint">{{ hint }}</p>
    <p v-if="message" :id="errorId" class="lm-field__error">{{ message }}</p>
  </div>
</template>

<style>
@layer lumen {
  .lm-field {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .lm-field__hint,
  .lm-field__error {
    margin: 0;
    font-size: 12px;
  }
  .lm-field__hint {
    color: var(--muted);
  }
  .lm-field__error {
    color: var(--danger);
  }
  :is(.lm-text-input, .lm-textarea, .lm-select, .lm-combobox, .lm-checkbox).lm-invalid,
  .lm-radio-group.lm-invalid .lm-radio {
    border-color: var(--danger);
  }
  .lm-switch.lm-invalid {
    box-shadow: 0 0 0 1px var(--danger);
  }
}
</style>
