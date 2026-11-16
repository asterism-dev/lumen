<script setup lang="ts">
import { minimalSetup } from 'codemirror';
import { Annotation, Compartment, EditorState, type Extension } from '@codemirror/state';
import {
  crosshairCursor,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers as lineNumberGutter,
  rectangularSelection,
} from '@codemirror/view';
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { lumenEditorTheme, lumenHighlightStyle } from './theme';

const props = withDefaults(
  defineProps<{ language?: Extension; readonly?: boolean; lineNumbers?: boolean }>(),
  { language: undefined, lineNumbers: true },
);
const model = defineModel<string>({ required: true });

const host = ref<HTMLElement>();
const view = shallowRef<EditorView>();
const languageSlot = new Compartment();
const readonlySlot = new Compartment();
const lineNumbersSlot = new Compartment();
const external = Annotation.define<boolean>();

const readonlyExtension = () => EditorState.readOnly.of(!!props.readonly);
const lineNumbersExtension = () =>
  props.lineNumbers
    ? [lineNumberGutter(), highlightActiveLineGutter(), foldGutter(), keymap.of(foldKeymap)]
    : [];

onMounted(() => {
  view.value = new EditorView({
    parent: host.value,
    state: EditorState.create({
      doc: model.value,
      extensions: [
        minimalSetup,
        EditorState.allowMultipleSelections.of(true),
        dropCursor(),
        indentOnInput(),
        bracketMatching(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        lumenEditorTheme,
        syntaxHighlighting(lumenHighlightStyle),
        languageSlot.of(props.language ?? []),
        readonlySlot.of(readonlyExtension()),
        lineNumbersSlot.of(lineNumbersExtension()),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !update.transactions.some((tr) => tr.annotation(external))) {
            model.value = update.state.doc.toString();
          }
        }),
      ],
    }),
  });
});

onBeforeUnmount(() => view.value?.destroy());

watch(model, (value) => {
  const v = view.value;
  if (!v || value === v.state.doc.toString()) return;
  v.dispatch({
    changes: { from: 0, to: v.state.doc.length, insert: value },
    annotations: external.of(true),
  });
});
watch(
  () => props.language,
  (language) => view.value?.dispatch({ effects: languageSlot.reconfigure(language ?? []) }),
);
watch(
  () => props.readonly,
  () => view.value?.dispatch({ effects: readonlySlot.reconfigure(readonlyExtension()) }),
);
watch(
  () => props.lineNumbers,
  () => view.value?.dispatch({ effects: lineNumbersSlot.reconfigure(lineNumbersExtension()) }),
);

defineExpose({ view: () => view.value });
</script>

<template>
  <div ref="host" class="lm-code-editor"></div>
</template>

<style>
@layer lumen {
  .lm-code-editor {
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  .lm-code-editor:focus-within {
    border-color: var(--accent);
  }
  .lm-code-editor .cm-editor {
    height: 100%;
  }
  @media (max-width: 767.98px) {
    .lm-code-editor .cm-content,
    .lm-code-editor .cm-gutters {
      font-size: 16px;
    }
  }
}
</style>
