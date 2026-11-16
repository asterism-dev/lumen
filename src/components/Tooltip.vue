<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui';

// ponytail: one provider per tooltip, so no shared skip-delay between neighbours; hoist one if that matters
defineProps<{ text: string }>();
</script>

<template>
  <TooltipProvider :delay-duration="500">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="lm-tooltip" :side-offset="4">{{ text }}</TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style>
@layer lumen {
  .lm-tooltip {
    z-index: 10004;
    background: var(--text);
    color: var(--bg);
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    max-width: 320px;
  }
}
</style>
