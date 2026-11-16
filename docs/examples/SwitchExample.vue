<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@asterism-dev/lumen';

const notifications = ref(true);
</script>

<template>
  <Switch v-model="notifications">Desktop notifications</Switch>
</template>
