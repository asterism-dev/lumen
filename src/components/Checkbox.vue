<script setup lang="ts">
import { Check, Minus } from '@lucide/vue';
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';

defineOptions({ inheritAttrs: false });
const model = defineModel<boolean | 'indeterminate'>({ required: true });
defineProps<{ disabled?: boolean }>();
</script>

<template>
  <label class="lm-choice" :class="{ 'lm-choice--disabled': disabled }">
    <CheckboxRoot v-bind="$attrs" v-model="model" :disabled="disabled" class="lm-checkbox">
      <CheckboxIndicator class="lm-checkbox__indicator">
        <Minus v-if="model === 'indeterminate'" :size="12" :stroke-width="3" />
        <Check v-else :size="12" :stroke-width="3" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <slot />
  </label>
</template>

<style>
@layer lumen {
  .lm-choice {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .lm-choice--disabled {
    opacity: 0.5;
    cursor: default;
  }
  .lm-checkbox {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;
    color: var(--on-accent);
    background: var(--panel);
    border: 1px solid var(--muted);
    border-radius: 3px;
    cursor: inherit;
  }
  .lm-checkbox[data-state='checked'],
  .lm-checkbox[data-state='indeterminate'] {
    background: var(--accent);
    border-color: var(--accent);
  }
  .lm-checkbox:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .lm-checkbox__indicator {
    display: contents;
  }
  @media (max-width: 767.98px) {
    .lm-choice {
      min-height: 44px;
      min-width: 44px;
    }
  }
}
</style>
