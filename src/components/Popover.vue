<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

withDefaults(defineProps<{ align?: 'start' | 'center' | 'end'; ariaLabel?: string }>(), {
  align: 'start',
  ariaLabel: undefined,
});
const open = defineModel<boolean>('open', { default: false });

defineSlots<{ default: () => unknown; content: () => unknown }>();
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="lm-popover" :align="align" :side-offset="4" :aria-label="ariaLabel">
        <slot name="content" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
