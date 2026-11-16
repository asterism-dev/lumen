<script setup lang="ts">
import type { Component } from 'vue';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui';

export interface MenuItem {
  label: string;
  action: () => void;
  icon?: Component;
  danger?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<{ items: MenuItem[]; align?: 'start' | 'center' | 'end' }>(), {
  align: 'start',
});
const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="lm-menu" :align="align" :side-offset="4">
        <DropdownMenuItem
          v-for="item in items"
          :key="item.label"
          class="lm-menu__item"
          :class="{ 'lm-menu__item--danger': item.danger }"
          :disabled="item.disabled"
          @select="item.action()"
        >
          <span v-if="items.some((i) => i.checked !== undefined)" class="lm-menu__check">{{
            item.checked ? '✓' : ''
          }}</span>
          <component :is="item.icon" v-if="item.icon" :size="16" :stroke-width="1.75" />
          {{ item.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
@layer lumen {
  .lm-menu,
  .lm-popover {
    z-index: 10002;
    color: var(--text);
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  }
  .lm-menu {
    min-width: 180px;
  }
  .lm-menu__item {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: var(--radius);
    cursor: pointer;
    outline: none;
    user-select: none;
  }
  .lm-menu__item[data-highlighted] {
    background: var(--select);
  }
  .lm-menu__item[data-disabled] {
    opacity: 0.5;
    cursor: default;
  }
  .lm-menu__item--danger {
    color: var(--danger);
  }
  .lm-menu__check {
    display: inline-block;
    width: 1.2em;
  }
  @media (max-width: 767.98px) {
    .lm-menu__item {
      min-height: 44px;
    }
  }
}
</style>
