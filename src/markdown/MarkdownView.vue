<script setup lang="ts">
import { computed } from 'vue';
import './hljs.css';
import { renderMarkdown } from './render';

const props = defineProps<{ source: string }>();
const emit = defineEmits<{ 'open-link': [href: string] }>();

const XLINK = 'http://www.w3.org/1999/xlink';
const html = computed(() => renderMarkdown(props.source));

function onClick(event: MouseEvent) {
  const link = (event.target as Element).closest('a, area');
  if (!link) return;
  event.preventDefault();
  const href = link.getAttribute('href') ?? link.getAttributeNS(XLINK, 'href');
  if (href) emit('open-link', href);
}
</script>

<template>
  <div class="lm-markdown" @click="onClick" @auxclick="onClick" v-html="html"></div>
</template>

<style>
@layer lumen {
  .lm-markdown {
    color: var(--text);
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  .lm-markdown > :first-child {
    margin-top: 0;
  }
  .lm-markdown > :last-child {
    margin-bottom: 0;
  }
  .lm-markdown h1,
  .lm-markdown h2,
  .lm-markdown h3,
  .lm-markdown h4 {
    margin: 1.2em 0 0.5em;
    line-height: 1.25;
  }
  .lm-markdown h1 {
    font-size: 1.6em;
  }
  .lm-markdown h2 {
    font-size: 1.35em;
  }
  .lm-markdown h3 {
    font-size: 1.15em;
  }
  .lm-markdown p,
  .lm-markdown ul,
  .lm-markdown ol,
  .lm-markdown pre,
  .lm-markdown table,
  .lm-markdown blockquote {
    margin: 0 0 0.8em;
  }
  .lm-markdown ul,
  .lm-markdown ol {
    padding-left: 1.5em;
  }
  .lm-markdown a {
    color: var(--accent);
  }
  .lm-markdown code {
    padding: 0.1em 0.35em;
    border-radius: 4px;
    background: var(--panel);
    font-size: 0.9em;
  }
  .lm-markdown pre {
    padding: 10px 12px;
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--panel);
  }
  .lm-markdown pre code {
    padding: 0;
    background: none;
  }
  .lm-markdown table {
    border-collapse: collapse;
  }
  .lm-markdown th,
  .lm-markdown td {
    padding: 4px 10px;
    border: 1px solid var(--border);
    text-align: left;
  }
  .lm-markdown blockquote {
    padding-left: 12px;
    border-left: 3px solid var(--border);
    color: var(--muted);
  }
}
</style>
