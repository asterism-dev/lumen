<script setup lang="ts" generic="T extends string">
import { Check, ChevronDown } from '@lucide/vue';
import { computed, watch } from 'vue';
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxRoot,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui';

export interface ComboboxOption<V extends string = string> {
  value: V;
  label: string;
}

const props = defineProps<{
  items: ComboboxOption<T>[];
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
}>();
const model = defineModel<T | ''>({ required: true });
// Filtering is the caller's job: watch `search` and pass the matching `items`
const search = defineModel<string>('search', { default: '' });
const open = defineModel<boolean>('open', { default: false });

defineSlots<{
  value?: (props: { value: T | ''; label: string }) => unknown;
  header?: () => unknown;
  'search-actions'?: () => unknown;
  item?: (props: { item: ComboboxOption<T>; selected: boolean }) => unknown;
  empty?: () => unknown;
}>();

const selectedLabel = computed(
  () => props.items.find((i) => i.value === model.value)?.label ?? model.value,
);

watch(open, (isOpen) => {
  if (isOpen) search.value = '';
});

function onPick(value: unknown) {
  if (typeof value !== 'string') return;
  model.value = value as T;
  open.value = false;
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger class="lm-combobox" :disabled="disabled">
      <span v-if="label" class="lm-combobox__label">{{ label }}</span>
      <span class="lm-combobox__value">
        <slot name="value" :value="model" :label="selectedLabel">
          <span class="lm-combobox__text">{{
            loading && !model ? 'Loading…' : selectedLabel || placeholder
          }}</span>
        </slot>
        <ChevronDown :size="14" :stroke-width="1.75" class="lm-combobox__chevron" />
      </span>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="lm-popover lm-combobox__panel" align="start" :side-offset="4">
        <slot name="header" />
        <ListboxRoot :model-value="model" class="lm-combobox__listbox" @update:model-value="onPick">
          <div class="lm-combobox__search">
            <ListboxFilter
              v-model="search"
              auto-focus
              class="lm-combobox__input"
              :placeholder="searchPlaceholder ?? 'Search'"
              spellcheck="false"
            />
            <slot name="search-actions" />
          </div>
          <ListboxContent class="lm-combobox__list">
            <ListboxItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
              class="lm-combobox__item"
            >
              <slot name="item" :item="item" :selected="item.value === model">
                <span class="lm-combobox__text">{{ item.label }}</span>
              </slot>
              <Check v-if="item.value === model" :size="14" :stroke-width="1.75" />
            </ListboxItem>
            <p v-if="!items.length" class="lm-combobox__empty">
              <slot name="empty">{{ loading ? 'Loading…' : 'No results.' }}</slot>
            </p>
          </ListboxContent>
        </ListboxRoot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
@layer lumen {
  .lm-combobox {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 8px;
    cursor: pointer;
  }
  .lm-combobox:disabled {
    cursor: default;
    opacity: 0.6;
  }
  .lm-combobox:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  .lm-combobox__label {
    font-size: 12px;
    color: var(--muted);
  }
  .lm-combobox__value {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }
  .lm-combobox__text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lm-combobox__chevron {
    flex: none;
    color: var(--muted);
  }
  .lm-combobox__panel {
    width: var(--reka-popover-trigger-width);
    box-sizing: border-box;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lm-combobox__search {
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 4px;
  }
  .lm-combobox__input {
    flex: 1;
    min-width: 0;
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    outline: none;
    padding: 2px 0;
  }
  .lm-combobox__list {
    max-height: 240px;
    overflow-y: auto;
  }
  .lm-combobox__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    border-radius: 4px;
    cursor: pointer;
    min-width: 0;
    outline: none;
  }
  .lm-combobox__item:hover,
  .lm-combobox__item[data-highlighted] {
    background: var(--select);
  }
  .lm-combobox__empty {
    margin: 0;
    padding: 4px 6px;
    color: var(--muted);
  }
  @media (max-width: 767.98px) {
    .lm-combobox,
    .lm-combobox__item {
      min-height: 44px;
    }
    .lm-combobox__input {
      font-size: 16px;
    }
  }
}
</style>
