<script lang="ts">
export type MarkdownMode = 'edit' | 'view' | 'split';
</script>

<script setup lang="ts">
import { markdown } from '@codemirror/lang-markdown';
import { Columns2, Eye, Pencil } from '@lucide/vue';
import SegmentedControl, { type SegmentOption } from '../components/SegmentedControl.vue';
import MarkdownView from '../markdown/MarkdownView.vue';
import CodeEditor from './CodeEditor.vue';

const markdownLanguage = markdown();
const modes: SegmentOption<MarkdownMode>[] = [
  { value: 'edit', label: 'Edit', icon: Pencil },
  { value: 'view', label: 'View', icon: Eye },
  { value: 'split', label: 'Split', icon: Columns2 },
];

const source = defineModel<string>({ required: true });
const mode = defineModel<MarkdownMode>('mode', { default: 'edit' });
defineEmits<{ 'open-link': [href: string] }>();
</script>

<template>
  <div class="lm-md">
    <div class="lm-md__header" role="toolbar" aria-label="Editor mode">
      <SegmentedControl v-model="mode" :options="modes" />
    </div>
    <div class="lm-md__body" :class="{ 'lm-md__split': mode === 'split' }">
      <CodeEditor
        v-if="mode !== 'view'"
        v-model="source"
        :language="markdownLanguage"
        :line-numbers="false"
        class="lm-md__pane"
      />
      <MarkdownView
        v-if="mode !== 'edit'"
        :source="source"
        class="lm-md__pane"
        @open-link="$emit('open-link', $event)"
      />
    </div>
  </div>
</template>

<style>
@layer lumen {
  .lm-md {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
    height: 100%;
  }
  .lm-md__header {
    display: flex;
    justify-content: flex-end;
  }
  .lm-md__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
  .lm-md__pane {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
  .lm-md__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  @media (max-width: 767.98px) {
    .lm-md__split {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
}
</style>
