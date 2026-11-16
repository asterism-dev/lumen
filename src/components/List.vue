<script setup lang="ts">
import { ListboxContent, ListboxRoot } from 'reka-ui';

defineProps<{ ariaLabel?: string }>();
const model = defineModel<string | null>({ required: true });
</script>

<template>
  <ListboxRoot v-model="model" class="lm-list" :aria-label="ariaLabel">
    <ListboxContent class="lm-list__content">
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
