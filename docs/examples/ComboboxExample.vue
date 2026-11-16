<script setup lang="ts">
import { RefreshCw } from '@lucide/vue';
import { computed, ref } from 'vue';
import { Button, Combobox, SegmentedControl } from '@asterism-dev/lumen';

const local = ['main', 'develop', 'feature/login', 'feature/dialogs'];
const remote = ['origin/main', 'origin/develop', 'origin/release/1.0'];

const branch = ref('main');
const search = ref('');
const kind = ref<'local' | 'remote'>('local');
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
  </div>
</template>
