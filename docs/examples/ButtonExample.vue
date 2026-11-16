<script setup lang="ts">
import { Plus, RefreshCw, X } from '@lucide/vue';
import { Button } from '@asterism-dev/lumen';
</script>

<template>
  <div class="row">
    <Button>Default</Button>
    <Button variant="accent" :icon="Plus">Create</Button>
    <Button variant="danger">Delete</Button>
    <Button disabled>Disabled</Button>
    <Button variant="ghost">Ghost</Button>
    <Button size="sm" :icon="RefreshCw">Refresh</Button>
    <Button variant="ghost" size="sm" :icon="X" aria-label="Close" />
  </div>
</template>
