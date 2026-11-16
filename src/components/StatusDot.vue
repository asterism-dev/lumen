<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'none' | 'idle' | 'waiting' | 'exited'; label: string }>(), {
  tone: 'none',
});
</script>

<template>
  <span class="lm-status-dot" :class="`lm-status-dot--${tone}`" role="img" :aria-label="label" />
</template>

<style>
@layer lumen {
  .lm-status-dot {
    display: inline-block;
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid var(--border);
  }
  .lm-status-dot--idle {
    background: var(--idle);
    border-color: var(--idle);
  }
  .lm-status-dot--waiting {
    background: var(--waiting);
    border-color: var(--waiting);
  }
  .lm-status-dot--exited {
    background: var(--exited);
    border-color: var(--exited);
  }
}
</style>
