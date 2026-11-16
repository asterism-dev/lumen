<script setup lang="ts">
import { Badge } from '@asterism-dev/lumen';
</script>

<template>
  <div class="row">
    <Badge>#10</Badge>
    <Badge tone="muted">Draft</Badge>
    <Badge tone="warning">#11 pending</Badge>
    <Badge tone="success">#12 passing</Badge>
    <Badge tone="danger">#13 failing</Badge>
    <Badge tone="merged">#14 merged</Badge>
    <Badge as="a" tone="success" href="#">Link badge</Badge>
    <Badge variant="outline" tone="muted">Outdated</Badge>
  </div>
</template>
