<script setup lang="ts">
import { X } from '@lucide/vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui';
import Button from './Button.vue';

const open = defineModel<boolean>('open', { required: true });
// The title slot (e.g. text with an inline Select) replaces the title prop
defineProps<{ title?: string; description?: string; width?: string; closable?: boolean }>();
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
          <div class="lm-dialog__header">
            <DialogTitle as="strong" class="lm-dialog__title">
              <slot name="title">{{ title }}</slot>
            </DialogTitle>
            <DialogClose v-if="closable" as-child>
              <Button variant="ghost" size="sm" :icon="X" aria-label="Close" />
            </DialogClose>
          </div>
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
  .lm-dialog__header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lm-dialog__title {
    flex: 1;
    min-width: 0;
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
