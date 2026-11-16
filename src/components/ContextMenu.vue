<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
} from 'reka-ui';
import type { MenuItem } from './Menu.vue';

defineProps<{ items: MenuItem[]; disabled?: boolean }>();
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child :disabled="disabled">
      <slot />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="lm-menu">
        <ContextMenuItem
          v-for="item in items"
          :key="item.label"
          class="lm-menu__item"
          :class="{ 'lm-menu__item--danger': item.danger }"
          :disabled="item.disabled"
          :title="item.title"
          @select="item.action()"
        >
          <span v-if="items.some((i) => i.checked !== undefined)" class="lm-menu__check">{{
            item.checked ? '✓' : ''
          }}</span>
          <component
            :is="item.icon"
            v-if="item.icon"
            :size="16"
            :stroke-width="1.75"
            v-bind="item.iconProps"
          />
          {{ item.label }}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
