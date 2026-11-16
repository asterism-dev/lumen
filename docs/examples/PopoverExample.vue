<script setup lang="ts">
import { Activity } from '@lucide/vue';
import { Button, Popover } from '@asterism-dev/lumen';
</script>

<template>
  <Popover aria-label="Activity">
    <Button :icon="Activity">Activity</Button>
    <template #content>
      <div class="panel">
        <strong>Cloning repository</strong>
        <span>Started 2 minutes ago</span>
      </div>
    </template>
  </Popover>
</template>

<style scoped>
.panel {
  width: 240px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
