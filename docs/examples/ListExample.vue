<script setup lang="ts">
import { ref } from 'vue';
import { List, ListItem } from '@asterism-dev/lumen';

const selected = ref<string | null>('alpha');
</script>

<template>
  <List v-model="selected" aria-label="Projects">
    <ListItem value="alpha">alpha</ListItem>
    <ListItem value="beta">beta</ListItem>
    <ListItem value="gamma" disabled>gamma (archived)</ListItem>
  </List>
</template>
