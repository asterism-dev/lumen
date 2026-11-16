<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { ref, watch } from 'vue';
import {
  Button,
  List,
  ListItem,
  SegmentedControl,
  Table,
  Tabs,
  TextInput,
  WorkspaceRail,
  type WorkspaceItem,
} from '../src';
import { CodeEditor, MarkdownEditor } from '../src/editor';
import { DataTable } from '../src/table';
import { Dock, type DockPanel } from '../src/dock';

const theme = ref<'light' | 'dark'>('light');
watch(theme, (value) => (document.documentElement.dataset.theme = value), { immediate: true });

const text = ref('hello');
const tab = ref('one');
const listValue = ref<string | null>('a');
const workspaces: WorkspaceItem[] = [
  { id: 'w1', name: 'Alpha', label: 'A', color: 'blue' },
  { id: 'w2', name: 'Beta', label: 'B', color: 'green', waiting: 2 },
  { id: 'w3', name: 'Gamma', label: 'G', color: 'purple' },
];
const activeWorkspace = ref<string | null>('w1');

const columns = [
  { key: 'id', label: 'ID', align: 'right' as const },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'size', label: 'Size', align: 'right' as const },
];
const rows = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: i % 7 === 3 ? null : `item-${(i * 37) % 50}`,
  size: i % 5 === 2 ? null : (i * 13) % 100,
}));

const markdown = ref(
  '# Hello\n\nA [link](https://example.com) and `inline code`.\n\n```js\nconst answer = 42;\n```\n',
);
const code = ref('function greet(name) {\n  return `hello ${name}`;\n}\n');
const log = ref<string[]>([]);
const onOpenLink = (href: string) => log.value.unshift(`open-link: ${href}`);

const panels = ref<DockPanel[]>([
  { id: 'p1', title: 'One' },
  { id: 'p2', title: 'Two' },
  { id: 'p3', title: 'Three' },
]);
const closePanel = (id: string) => (panels.value = panels.value.filter((p) => p.id !== id));
</script>

<template>
  <div class="demo">
    <WorkspaceRail
      :workspaces="workspaces"
      :active="activeWorkspace"
      @select="activeWorkspace = $event"
    />
    <main class="demo__main">
      <SegmentedControl
        v-model="theme"
        :options="[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]"
      />

      <h2>Inputs</h2>
      <div class="demo__row">
        <Button>Default</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <TextInput v-model="text" placeholder="Text" />
      </div>

      <h2>Tabs</h2>
      <Tabs
        v-model="tab"
        :tabs="[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
          { value: 'three', label: 'A tab with a long label' },
          { value: 'four', label: 'Another long tab label' },
        ]"
      >
        <template #one>First</template>
        <template #two>Second</template>
        <template #three>Third</template>
        <template #four>Fourth</template>
      </Tabs>

      <h2>List</h2>
      <List v-model="listValue" aria-label="Items">
        <ListItem value="a">Alpha</ListItem>
        <ListItem value="b">Beta</ListItem>
        <ListItem value="c" disabled>Gamma (disabled)</ListItem>
      </List>

      <h2>Table</h2>
      <Table :columns="columns" :rows="rows.slice(0, 3)" row-key="id" />

      <h2>DataTable</h2>
      <div class="demo__table">
        <DataTable :columns="columns" :rows="rows" row-key="id" />
      </div>

      <h2>MarkdownEditor</h2>
      <div class="demo__bounded">
        <MarkdownEditor v-model="markdown" @open-link="onOpenLink" />
      </div>
      <pre>{{ log.join('\n') || 'no links opened yet' }}</pre>

      <h2>CodeEditor</h2>
      <CodeEditor v-model="code" :language="javascript()" />

      <h2>Dock</h2>
      <div class="demo__bounded">
        <Dock :panels="panels" @close="closePanel">
          <template #p1>Panel one</template>
          <template #p2>Panel two</template>
          <template #p3>Panel three</template>
        </Dock>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font: var(--font-ui);
}
.demo {
  display: flex;
  min-height: 100vh;
}
.demo__main {
  flex: 1;
  min-width: 0;
  padding: 16px;
}
.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.demo__table {
  max-height: 320px;
  overflow: auto;
}
.demo__bounded {
  display: flex;
  flex-direction: column;
  height: 320px;
}
@media (max-width: 767.98px) {
  .demo {
    flex-direction: column-reverse;
  }
}
</style>
