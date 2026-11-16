import type { EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CodeEditor from '../src/editor/CodeEditor.vue';

const mounted: VueWrapper[] = [];
function mountEditor(props: Record<string, unknown> = {}) {
  const wrapper = mount(CodeEditor, { props: { modelValue: 'a', ...props } });
  mounted.push(wrapper);
  return wrapper;
}
const view = (w: ReturnType<typeof mountEditor>) =>
  (w.vm as unknown as { view(): EditorView }).view();

afterEach(() => mounted.splice(0).forEach((w) => w.unmount()));

describe('CodeEditor', () => {
  it('shows the initial model value', () => {
    expect(view(mountEditor()).state.doc.toString()).toBe('a');
  });

  it('emits update:modelValue when the document changes', () => {
    const w = mountEditor();
    view(w).dispatch({ changes: { from: 1, insert: 'b' } });
    expect(w.emitted('update:modelValue')).toEqual([['ab']]);
  });

  it('replaces the document when modelValue changes from outside', async () => {
    const w = mountEditor();
    await w.setProps({ modelValue: 'xyz' });
    expect(view(w).state.doc.toString()).toBe('xyz');
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });

  it('does not emit when the outside value equals the document', async () => {
    const w = mountEditor();
    view(w).dispatch({ changes: { from: 1, insert: 'b' } });
    await w.setProps({ modelValue: 'ab' });
    expect(w.emitted('update:modelValue')).toEqual([['ab']]);
    expect(view(w).state.doc.toString()).toBe('ab');
  });

  it('switches language without recreating the view', async () => {
    const w = mountEditor();
    const before = view(w);
    await w.setProps({ language: markdown() });
    expect(view(w)).toBe(before);
  });

  it('respects readonly', async () => {
    const w = mountEditor({ readonly: true });
    expect(view(w).state.readOnly).toBe(true);
    await w.setProps({ readonly: false });
    expect(view(w).state.readOnly).toBe(false);
  });

  it('toggles line numbers', async () => {
    const w = mountEditor();
    expect(w.find('.cm-lineNumbers').exists()).toBe(true);
    expect(w.find('.cm-gutters').exists()).toBe(true);
    await w.setProps({ lineNumbers: false });
    expect(w.find('.cm-lineNumbers').exists()).toBe(false);
    expect(w.find('.cm-gutters').exists()).toBe(false);
  });

  it('destroys the view on unmount', () => {
    const w = mountEditor();
    const v = view(w);
    const destroy = vi.spyOn(v, 'destroy');
    w.unmount();
    expect(destroy).toHaveBeenCalled();
  });
});
