<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import type { StyleValue } from 'vue';
import { useFieldControl } from '../composables/useField';

// class and style lay out the label; all other attrs target the control
defineOptions({ inheritAttrs: false });
const model = defineModel<boolean>({ required: true });
const props = defineProps<{ disabled?: boolean; invalid?: boolean }>();
const control = useFieldControl(
  () => model.value,
  () => props.invalid,
);
</script>

<template>
  <label
    class="lm-choice"
    :class="[{ 'lm-choice--disabled': disabled }, $attrs.class]"
    :style="$attrs.style as StyleValue"
  >
    <SwitchRoot
      v-bind="{
        ...control.attrs.value,
        ...$attrs,
        class: control.attrs.value.class,
        style: undefined,
      }"
      v-model="model"
      :disabled="disabled"
      class="lm-switch"
    >
      <SwitchThumb class="lm-switch__thumb" />
    </SwitchRoot>
    <slot />
  </label>
</template>

<style>
@layer lumen {
  .lm-switch {
    flex: none;
    position: relative;
    width: 30px;
    height: 18px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 9px;
    background: var(--border);
    cursor: inherit;
    transition: background 0.15s;
  }
  .lm-switch[data-state='checked'] {
    background: var(--accent);
  }
  .lm-switch:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .lm-switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.15s;
  }
  .lm-switch__thumb[data-state='checked'] {
    transform: translateX(12px);
  }
}
</style>
