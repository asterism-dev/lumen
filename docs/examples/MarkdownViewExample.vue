<script setup lang="ts">
import { ref } from 'vue';
import { MarkdownView } from '@asterism-dev/lumen/markdown';

const source =
  '## Release notes\n\nAdds `Dialog` and [more](https://example.com).\n\n```ts\nconst answer = 42;\n```\n';
const opened = ref('');
</script>

<template>
  <div class="stack">
    <MarkdownView :source="source" @open-link="opened = $event" />
    <span>Link clicked: {{ opened || 'none' }}</span>
  </div>
</template>
