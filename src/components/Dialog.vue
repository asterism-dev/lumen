<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui';

const open = defineModel<boolean>('open', { required: true });
defineProps<{ title: string; description?: string; width?: string }>();
defineEmits<{ openAutoFocus: [event: Event] }>();
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="lm-dialog-overlay">
        <DialogContent
          class="lm-dialog"
          :style="width ? { width } : undefined"
          v-bind="description ? {} : { 'aria-describedby': undefined }"
          @open-auto-focus="$emit('openAutoFocus', $event)"
        >
          <DialogTitle as="strong" class="lm-dialog__title">{{ title }}</DialogTitle>
          <DialogDescription v-if="description" as="p" class="lm-dialog__description">
            {{ description }}
          </DialogDescription>
          <slot />
          <div v-if="$slots.actions" class="lm-dialog__actions">
            <slot name="actions" />
          </div>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
@layer lumen {
  .lm-dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    place-items: center;
    z-index: 10001;
  }
  .lm-dialog {
    background: var(--panel);
    color: var(--text);
    border-radius: 10px;
    padding: 18px;
    width: 460px;
    max-width: 100%;
    max-height: calc(100vh - 32px);
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lm-dialog:focus {
    outline: none;
  }
  .lm-dialog__description {
    margin: 0;
    color: var(--muted);
  }
  .lm-dialog__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  @media (max-width: 767.98px) {
    .lm-dialog-overlay {
      place-items: stretch;
    }
    .lm-dialog {
      width: auto !important;
      max-height: none;
      border-radius: 0;
      padding: calc(16px + env(safe-area-inset-top)) 16px calc(16px + env(safe-area-inset-bottom));
    }
  }
}
</style>
