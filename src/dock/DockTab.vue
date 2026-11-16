<script lang="ts">
import type { InjectionKey } from 'vue';
import type { DockPanel } from './Dock.vue';

export interface DockTabContext {
  panel: (id: string) => DockPanel | undefined;
  close: (id: string) => void;
}
export const dockTabKey: InjectionKey<DockTabContext> = Symbol('lm-dock-tab');
</script>

<script setup lang="ts">
import { X } from '@lucide/vue';
import { computed, inject } from 'vue';

const props = defineProps<{ params: { api: { id: string } } }>();
const ctx = inject(dockTabKey)!;
const panel = computed(() => ctx.panel(props.params.api.id));
</script>

<template>
  <div class="lm-dock-tab">
    <component :is="panel.icon" v-if="panel?.icon" :size="14" :stroke-width="1.75" />
    <span>{{ panel?.title }}</span>
    <button
      type="button"
      class="lm-dock-tab__close"
      :aria-label="`Close ${panel?.title}`"
      @pointerdown.stop
      @click.stop="ctx.close(props.params.api.id)"
    >
      <X :size="14" :stroke-width="1.75" />
    </button>
  </div>
</template>
