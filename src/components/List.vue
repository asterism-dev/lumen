<script setup lang="ts">
import { ListboxContent, ListboxRoot } from 'reka-ui';

defineProps<{ ariaLabel?: string }>();
const model = defineModel<string | null>({ required: true });
</script>

<template>
  <ListboxRoot v-model="model" class="lm-list" selection-behavior="replace">
    <ListboxContent class="lm-list__content" :aria-label="ariaLabel">
      <slot />
    </ListboxContent>
  </ListboxRoot>
</template>

<style>
@layer lumen {
  .lm-list {
    min-height: 0;
    overflow-y: auto;
  }
  .lm-list__content {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
}
</style>
