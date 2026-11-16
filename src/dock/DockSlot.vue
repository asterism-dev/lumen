<script lang="ts">
import type { InjectionKey, Slots } from 'vue';

export const dockSlotsKey: InjectionKey<Slots> = Symbol('lm-dock-slots');
</script>

<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps<{ params: { params: { id: string } } }>();
const slots = inject(dockSlotsKey, {});
</script>

<template>
  <component :is="() => slots[props.params.params.id]?.()" />
</template>
