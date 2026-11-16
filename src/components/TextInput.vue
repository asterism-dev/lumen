<script setup lang="ts">
const model = defineModel<string>({ required: true });

withDefaults(
  defineProps<{ type?: 'text' | 'search'; placeholder?: string; disabled?: boolean }>(),
  {
    type: 'text',
    placeholder: undefined,
  },
);
</script>

<template>
  <input
    v-model="model"
    class="lm-text-input"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<style>
@layer lumen {
  .lm-text-input {
    font: inherit;
    color: inherit;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 5px 8px;
    width: 100%;
    box-sizing: border-box;
  }
  .lm-text-input:disabled {
    opacity: 0.5;
  }
  @media (max-width: 767.98px) {
    .lm-text-input {
      font-size: 16px;
      min-height: 44px;
    }
  }
}
</style>
