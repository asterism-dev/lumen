<script setup lang="ts">
import { ref } from 'vue';
import { Button, Dialog } from '@asterism-dev/lumen';

const open = ref(false);
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
  <Button @click="open = true">Quit…</Button>
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
</template>
