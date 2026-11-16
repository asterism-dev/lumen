<script setup lang="ts">
import { StatusDot } from '@asterism-dev/lumen';
</script>

<template>
  <div class="row">
    <span class="item"><StatusDot label="Unknown" /> none</span>
    <span class="item"><StatusDot tone="idle" label="Idle" /> idle</span>
    <span class="item"><StatusDot tone="waiting" label="Waiting for input" /> waiting</span>
    <span class="item"><StatusDot tone="exited" label="Exited" /> exited</span>
  </div>
</template>

<style scoped>
.item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
