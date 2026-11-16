<script setup lang="ts">
import type { Component } from 'vue';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

export interface TabItem {
  value: string;
  label: string;
  icon?: Component;
}

defineProps<{ tabs: TabItem[] }>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <TabsRoot v-model="model" class="lm-tabs">
    <TabsList class="lm-tabs__list">
      <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value" class="lm-tabs__tab">
        <component :is="tab.icon" v-if="tab.icon" :size="14" :stroke-width="1.75" />
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="lm-tabs__panel">
      <slot :name="tab.value" />
    </TabsContent>
  </TabsRoot>
</template>

<style>
@layer lumen {
  .lm-tabs {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .lm-tabs__list {
    display: flex;
    flex: none;
    overflow-x: auto;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
    scrollbar-width: none;
  }
  .lm-tabs__list::-webkit-scrollbar {
    display: none;
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
    border-right: 1px solid var(--border);
    padding: 6px 12px;
    cursor: pointer;
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
  .lm-tabs__panel {
    flex: 1;
    min-height: 0;
  }
  @media (max-width: 767.98px) {
    .lm-tabs__tab {
      min-height: 44px;
    }
  }
}
</style>
