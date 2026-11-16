<script lang="ts">
import type { Component } from 'vue';

export interface DockPanel {
  id: string;
  title: string;
  icon?: Component;
}
</script>

<script setup lang="ts">
import {
  DockviewVue,
  themeLight,
  type DockviewApi,
  type DockviewReadyEvent,
  type VueComponent,
} from 'dockview-vue';
import { computed, provide, useSlots, watch } from 'vue';
import Tabs from '../components/Tabs.vue';
import { useIsMobile } from '../composables/useIsMobile';
import DockSlot, { dockSlotsKey } from './DockSlot.vue';
import './dock.css';

const props = defineProps<{ panels: DockPanel[] }>();
const active = defineModel<string | null>('active', { default: null });
const emit = defineEmits<{ ready: [api: DockviewApi] }>();

const slots = useSlots();
provide(dockSlotsKey, slots);
const isMobile = useIsMobile();
const components = { 'lm-dock-slot': DockSlot as unknown as VueComponent };

const tabs = computed(() =>
  props.panels.map((p) => ({ value: p.id, label: p.title, icon: p.icon })),
);
const tabValue = computed({
  get: () => active.value ?? props.panels[0]?.id ?? '',
  set: (v) => (active.value = v),
});

let api: DockviewApi | undefined;

function syncPanels(next: DockPanel[]) {
  if (!api) return;
  const ids = new Set(next.map((p) => p.id));
  for (const existing of [...api.panels]) if (!ids.has(existing.id)) api.removePanel(existing);
  for (const p of next) {
    const existing = api.getPanel(p.id);
    if (!existing) {
      api.addPanel({ id: p.id, title: p.title, component: 'lm-dock-slot', params: { id: p.id } });
    } else if (existing.title !== p.title) {
      existing.api.setTitle(p.title);
    }
  }
}

function onReady({ api: readyApi }: DockviewReadyEvent) {
  api = readyApi;
  syncPanels(props.panels);
  if (active.value && api.getPanel(active.value)) api.getPanel(active.value)!.api.setActive();
  else active.value = api.activePanel?.id ?? null;
  api.onDidActivePanelChange(({ panel }) => (active.value = panel?.id ?? null));
  emit('ready', api);
}

watch(() => props.panels, syncPanels, { deep: true });
watch(active, (id) => {
  if (id && api?.activePanel?.id !== id) api?.getPanel(id)?.api.setActive();
});
</script>

<template>
  <Tabs v-if="isMobile" v-model="tabValue" :tabs="tabs" keep-mounted class="lm-dock">
    <template v-for="panel in panels" :key="panel.id" #[panel.id]>
      <slot :name="panel.id" />
    </template>
  </Tabs>
  <DockviewVue
    v-else
    class="lm-dock"
    :theme="themeLight"
    :components="components"
    @ready="onReady"
  />
</template>
