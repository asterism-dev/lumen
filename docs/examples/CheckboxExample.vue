<script setup lang="ts">
import { computed, ref } from 'vue';
import { Checkbox } from '@asterism-dev/lumen';

const tasks = ref([
  { name: 'fix-login', picked: true },
  { name: 'add-dialogs', picked: false },
]);
const all = computed(() => {
  const picked = tasks.value.filter((t) => t.picked).length;
  return picked === tasks.value.length ? true : picked ? 'indeterminate' : false;
});
const setAll = (value: boolean | 'indeterminate') =>
  tasks.value.forEach((t) => (t.picked = value === true));
</script>

<template>
  <div class="stack">
    <Checkbox :model-value="all" @update:model-value="setAll">Select all</Checkbox>
    <Checkbox v-for="task in tasks" :key="task.name" v-model="task.picked">
      {{ task.name }}
    </Checkbox>
    <Checkbox :model-value="false" disabled>Disabled</Checkbox>
  </div>
</template>
