<script setup lang="ts">
import { X } from '@lucide/vue';
import type { Component } from 'vue';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

export interface TabItem {
  value: string;
  label: string;
  icon?: Component;
}

defineOptions({ inheritAttrs: false });
withDefaults(
  defineProps<{
    tabs: TabItem[];
    keepMounted?: boolean;
    closable?: boolean;
    variant?: 'boxed' | 'underline';
  }>(),
  { variant: 'boxed' },
);
defineEmits<{ close: [value: string] }>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <TabsRoot
    v-model="model"
    v-bind="{ ...$attrs, 'aria-label': undefined, 'aria-labelledby': undefined }"
    class="lm-tabs"
    :class="`lm-tabs--${variant}`"
  >
    <div class="lm-tabs__bar">
      <TabsList
        class="lm-tabs__list"
        :aria-label="$attrs['aria-label'] as string"
        :aria-labelledby="$attrs['aria-labelledby'] as string"
      >
        <div v-for="tab in tabs" :key="tab.value" class="lm-tabs__item">
          <TabsTrigger :value="tab.value" class="lm-tabs__tab">
            <slot name="tab" :tab="tab" :active="tab.value === model">
              <component :is="tab.icon" v-if="tab.icon" :size="14" :stroke-width="1.75" />
              {{ tab.label }}
            </slot>
          </TabsTrigger>
          <button
            v-if="closable"
            type="button"
            class="lm-tabs__close"
            :aria-label="`Close ${tab.label}`"
            @pointerdown.stop
            @click.stop="$emit('close', tab.value)"
          >
            <X :size="14" :stroke-width="1.75" />
          </button>
        </div>
      </TabsList>
      <div v-if="$slots.end" class="lm-tabs__end"><slot name="end" /></div>
    </div>
    <!-- Without a slot per tab the caller renders the content itself -->
    <template v-for="tab in tabs" :key="tab.value">
      <TabsContent
        v-if="$slots[tab.value]"
        :value="tab.value"
        :force-mount="keepMounted || undefined"
        class="lm-tabs__panel"
      >
        <slot :name="tab.value" />
      </TabsContent>
    </template>
  </TabsRoot>
</template>

<style>
@layer lumen {
  .lm-tabs {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .lm-tabs__bar {
    display: flex;
    align-items: center;
    flex: none;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
  }
  .lm-tabs__list {
    display: flex;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .lm-tabs__end {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: none;
    padding: 0 10px;
  }
  .lm-tabs__list::-webkit-scrollbar {
    display: none;
  }
  .lm-tabs__item {
    display: flex;
    flex: none;
    border-right: 1px solid var(--border);
    background: var(--panel);
  }
  .lm-tabs__item:has(.lm-tabs__tab[data-state='active']) {
    background: var(--bg);
  }
  .lm-tabs__tab {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    font: inherit;
    color: var(--muted);
    background: var(--panel);
    border: 0;
    padding: 6px 12px;
    cursor: pointer;
  }
  .lm-tabs__close {
    display: inline-flex;
    align-items: center;
    color: var(--muted);
    background: none;
    border: 0;
    padding: 0 8px 0 0;
    cursor: pointer;
  }
  .lm-tabs__close:hover {
    color: var(--text);
  }
  .lm-tabs__close:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-tabs__tab svg {
    flex: none;
  }
  .lm-tabs__tab[data-state='active'] {
    color: var(--text);
    background: var(--bg);
  }
  .lm-tabs__tab:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-tabs--underline .lm-tabs__bar,
  .lm-tabs--underline .lm-tabs__item,
  .lm-tabs--underline .lm-tabs__item:has(.lm-tabs__tab[data-state='active']),
  .lm-tabs--underline .lm-tabs__tab,
  .lm-tabs--underline .lm-tabs__tab[data-state='active'] {
    background: none;
    border-right: 0;
  }
  .lm-tabs--underline .lm-tabs__tab[data-state='active'] {
    box-shadow: inset 0 -2px 0 var(--accent);
  }
  .lm-tabs__tab {
    min-height: var(--lm-touch-target);
  }
  .lm-tabs__close {
    min-width: var(--lm-touch-target);
    min-height: var(--lm-touch-target);
  }
  .lm-tabs__panel {
    flex: 1;
    min-height: 0;
  }
  .lm-tabs__panel[data-state='inactive'] {
    display: none;
  }
  @media (max-width: 767.98px) {
    .lm-tabs__close {
      justify-content: center;
      padding: 0;
    }
  }
  .lm-touch .lm-tabs__close {
    justify-content: center;
    padding: 0;
  }
}
</style>
