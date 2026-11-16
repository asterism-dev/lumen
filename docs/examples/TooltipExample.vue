<script setup lang="ts">
import { RefreshCw } from '@lucide/vue';
import { Button, Tooltip } from '@asterism-dev/lumen';
</script>

<template>
  <Tooltip text="Refresh branches">
    <Button variant="ghost" :icon="RefreshCw" aria-label="Refresh branches" />
  </Tooltip>
</template>
