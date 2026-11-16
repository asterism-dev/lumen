<script setup lang="ts">
import { ref } from 'vue';
import { RadioGroup } from '@asterism-dev/lumen';

const filter = ref<'all' | 'open' | 'resolved'>('all');
const color = ref('blue');
const colors = ['blue', 'green', 'amber', 'red'].map((c) => ({ value: c, label: c, title: c }));
</script>

<template>
  <div class="stack">
    <RadioGroup
      v-model="filter"
      :options="[
        { value: 'all', label: 'All' },
        { value: 'open', label: 'Open' },
        { value: 'resolved', label: 'Resolved' },
      ]"
    />
    <RadioGroup v-model="color" :options="colors" variant="custom" aria-label="Color">
      <template #option="{ option }">
        <span class="swatch" :style="{ background: `var(--ws-${option.value})` }" />
      </template>
    </RadioGroup>
  </div>
</template>

<style scoped>
.swatch {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
</style>
