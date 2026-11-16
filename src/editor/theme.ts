import { HighlightStyle } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

export const lumenHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.operatorKeyword, t.modifier], color: 'var(--hl-keyword)' },
  { tag: [t.string, t.regexp], color: 'var(--hl-string)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--hl-comment)' },
  { tag: [t.number, t.bool, t.null], color: 'var(--hl-number)' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--hl-title)' },
  { tag: [t.typeName, t.className], color: 'var(--hl-type)' },
  { tag: [t.attributeName, t.propertyName], color: 'var(--hl-attr)' },
]);

export const lumenEditorTheme: Extension = EditorView.theme({
  '&': { color: 'var(--text)', backgroundColor: 'var(--panel)', height: '100%' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  '.cm-content': { caretColor: 'var(--accent)' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--accent)' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: 'var(--select)' },
  '.cm-gutters': {
    backgroundColor: 'var(--panel)',
    color: 'var(--muted)',
    borderRight: '1px solid var(--border)',
  },
  '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: 'transparent' },
});
