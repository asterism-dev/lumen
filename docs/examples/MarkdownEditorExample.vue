<script setup lang="ts">
import { ref } from 'vue';
import { MarkdownEditor, type MarkdownMode } from '@asterism-dev/lumen/editor';

const source = ref(
  '# Notes\n\n- [x] Draft dialogs\n- [ ] Ship combobox\n\nSee [lumen](https://example.com).\n',
);
const mode = ref<MarkdownMode>('split');
const opened = ref('');
</script>

<template>
  <div class="stack">
    <div class="bounded">
      <MarkdownEditor v-model="source" v-model:mode="mode" @open-link="opened = $event" />
    </div>
    <span>Link clicked: {{ opened || 'none' }}</span>
  </div>
</template>

<style scoped>
.bounded {
  height: 280px;
}
</style>
