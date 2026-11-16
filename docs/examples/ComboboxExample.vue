<script setup lang="ts">
import { RefreshCw } from '@lucide/vue';
import { computed, ref } from 'vue';
import { Button, Combobox, SegmentedControl } from '@asterism-dev/lumen';

const local = ['main', 'develop', 'feature/login', 'feature/dialogs'];
const remote = ['origin/main', 'origin/develop', 'origin/release/1.0'];

const branch = ref('main');
const search = ref('');
const kind = ref<'local' | 'remote'>('local');
const issue = ref('');
const issues = [
  { value: 'AST-1', label: 'AST-1 Fix login' },
  { value: 'AST-2', label: 'AST-2 Fails to load' },
  {
    value: 'AST-3',
    label: 'AST-3 Archived',
    disabled: true,
    title: 'Archived issues cannot be used',
  },
];

// Simulates loading the issue details; AST-2 always fails
function loadIssue(value: string, signal: AbortSignal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => (value === 'AST-2' ? reject(new Error('Could not load AST-2')) : resolve(value)),
      800,
    );
    signal.addEventListener('abort', () => clearTimeout(timer));
  });
}
const items = computed(() =>
  (kind.value === 'local' ? local : remote)
    .filter((b) => b.toLowerCase().includes(search.value.toLowerCase()))
    .map((b) => ({ value: b, label: b })),
);
</script>

<template>
  <div class="narrow">
    <Combobox
      v-model="branch"
      v-model:search="search"
      :items="items"
      label="Base branch"
      placeholder="Choose a branch"
      search-placeholder="Search branches"
    >
      <template #header>
        <SegmentedControl
          v-model="kind"
          :options="[
            { value: 'local', label: 'Local' },
            { value: 'remote', label: 'Remote' },
          ]"
        />
      </template>
      <template #search-actions>
        <Button variant="ghost" size="sm" :icon="RefreshCw" aria-label="Refresh branches" />
      </template>
    </Combobox>
    <Combobox v-model="issue" :items="issues" :before-select="loadIssue">
      <template #trigger="{ label }">
        <Button>{{ label || 'Select issue' }}</Button>
      </template>
    </Combobox>
    <Button v-if="issue" variant="ghost" size="sm" @click="issue = ''">Clear</Button>
  </div>
</template>
