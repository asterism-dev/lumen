<script setup lang="ts">
import { ref } from 'vue';
import { Button, Dialog, Select } from '@asterism-dev/lumen';

const open = ref(false);
const createOpen = ref(false);
const project = ref<number | null>(null);
const projects = [
  { value: 1, label: 'asterism' },
  { value: 2, label: 'lumen' },
];
const busy = ref(false);

function keepRunning() {
  busy.value = true;
  setTimeout(() => {
    busy.value = false;
    open.value = false;
  }, 1000);
}
</script>

<template>
  <div class="row">
    <Button @click="open = true">Quit…</Button>
    <Button @click="createOpen = true">New task…</Button>
  </div>
  <Dialog
    :open="open"
    title="Stop the daemon too?"
    description="2 sessions are still running."
    @update:open="(value) => busy || (open = value)"
  >
    <template #actions>
      <Button :disabled="busy" @click="open = false">Cancel</Button>
      <Button variant="accent" :disabled="busy" @click="keepRunning">Keep running</Button>
    </template>
  </Dialog>
  <Dialog v-model:open="createOpen" closable>
    <template #title>
      Create Task in
      <Select v-model="project" :options="projects" placeholder="Project" aria-label="Project" />
    </template>
    <p>Body</p>
  </Dialog>
</template>
