<script setup lang="ts">
import { Plus } from '@lucide/vue';

export type WorkspaceColor =
  'blue' | 'green' | 'amber' | 'red' | 'purple' | 'pink' | 'teal' | 'slate';

export interface WorkspaceItem {
  id: string;
  name: string;
  label: string;
  color?: WorkspaceColor;
  waiting?: number;
}

const props = defineProps<{ workspaces: WorkspaceItem[]; active: string | null }>();
const tileLabel = (w: WorkspaceItem) =>
  props.active !== w.id && w.waiting ? `${w.name}, ${w.waiting} waiting` : w.name;

defineEmits<{
  select: [id: string];
  add: [];
  contextmenu: [id: string, event: MouseEvent];
}>();
</script>

<template>
  <nav class="lm-rail" aria-label="Workspaces">
    <!-- ponytail: English strings hardcoded, add i18n props when nebula needs more languages -->
    <button
      v-for="w in workspaces"
      :key="w.id"
      type="button"
      class="lm-button lm-rail__tile"
      :class="{ 'lm-rail__tile--active': active === w.id, 'lm-rail__tile--colored': !!w.color }"
      :style="w.color ? { '--tile': `var(--ws-${w.color})` } : undefined"
      :title="tileLabel(w)"
      :aria-label="tileLabel(w)"
      :aria-pressed="active === w.id"
      @click="$emit('select', w.id)"
      @contextmenu="$emit('contextmenu', w.id, $event)"
    >
      {{ w.label }}
      <span v-if="active !== w.id && w.waiting" class="lm-rail__badge">{{ w.waiting }}</span>
    </button>
    <button
      type="button"
      class="lm-button lm-rail__tile lm-rail__tile--add"
      title="New workspace"
      aria-label="New workspace"
      @click="$emit('add')"
    >
      <Plus :size="16" :stroke-width="1.75" />
    </button>
  </nav>
</template>

<style>
@layer lumen {
  .lm-rail {
    flex: none;
    width: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 8px 0;
    border-right: 1px solid var(--border);
    overflow-y: auto;
  }
  .lm-rail .lm-rail__tile {
    position: relative;
    width: 32px;
    height: 32px;
    padding: 0;
    font-weight: 600;
    font-size: 12px;
    border-radius: 8px;
  }
  .lm-rail__tile:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-rail .lm-rail__tile.lm-rail__tile--active:not(:disabled) {
    background: var(--select);
    border-color: var(--muted);
  }
  .lm-rail .lm-rail__tile.lm-rail__tile--colored {
    color: var(--tile);
    border-color: var(--tile);
  }
  .lm-rail .lm-rail__tile.lm-rail__tile--colored.lm-rail__tile--active:not(:disabled) {
    background: var(--tile);
    color: var(--bg);
  }
  .lm-rail .lm-rail__tile--add {
    margin-top: auto;
    color: var(--muted);
  }
  .lm-rail__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--waiting);
    color: var(--on-accent);
    padding: 0 5px;
    border-radius: 10px;
    font-size: 11px;
  }
  @media (max-width: 767.98px) {
    .lm-rail {
      width: auto;
      flex-direction: row;
      padding: 8px max(8px, env(safe-area-inset-right)) calc(8px + env(safe-area-inset-bottom))
        max(8px, env(safe-area-inset-left));
      border-right: 0;
      border-top: 1px solid var(--border);
      overflow-y: visible;
      overflow-x: auto;
    }
    .lm-rail .lm-rail__tile {
      flex: none;
      width: 44px;
      height: 44px;
    }
    .lm-rail .lm-rail__tile--add {
      margin-top: 0;
      margin-left: auto;
    }
  }
}
</style>
