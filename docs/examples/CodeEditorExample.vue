<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { ref } from 'vue';
import { CodeEditor } from '@asterism-dev/lumen/editor';

const code = ref('function greet(name) {\n  return `hello ${name}`;\n}\n');
</script>

<template>
  <CodeEditor v-model="code" :language="javascript()" />
</template>
