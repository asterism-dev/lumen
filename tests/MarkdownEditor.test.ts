import type { EditorView } from '@codemirror/view';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import CodeEditor from '../src/editor/CodeEditor.vue';
import MarkdownView from '../src/markdown/MarkdownView.vue';
import MarkdownEditor from '../src/editor/MarkdownEditor.vue';

const mounted: VueWrapper[] = [];
function mountEditor(props: Record<string, unknown> = {}) {
  const wrapper = mount(MarkdownEditor, { props: { modelValue: '# Hi', ...props } });
  mounted.push(wrapper);
  return wrapper;
}

afterEach(() => mounted.splice(0).forEach((w) => w.unmount()));

describe('MarkdownEditor', () => {
  it('starts in edit mode with only the code editor', () => {
    const w = mountEditor();
    expect(w.find('.cm-editor').exists()).toBe(true);
    expect(w.find('.lm-markdown').exists()).toBe(false);
  });

  it('shows only the rendered view in view mode', () => {
    const w = mountEditor({ mode: 'view' });
    expect(w.find('.cm-editor').isVisible()).toBe(false);
    expect(w.find('.lm-markdown h1').text()).toBe('Hi');
  });

  it('shows editor and view side by side in split mode', () => {
    const w = mountEditor({ mode: 'split' });
    expect(w.find('.lm-md__split .cm-editor').exists()).toBe(true);
    expect(w.find('.lm-md__split .lm-markdown').exists()).toBe(true);
  });

  it('emits update:mode when a segment is clicked', async () => {
    const w = mountEditor();
    await w
      .findAll('button')
      .find((b) => b.text() === 'Split')!
      .trigger('click');
    expect(w.emitted('update:mode')).toEqual([['split']]);
  });

  it('updates the view when the text changes in split mode', async () => {
    const w = mountEditor({ mode: 'split' });
    const view = (w.getComponent(CodeEditor).vm as unknown as { view(): EditorView }).view();
    view.dispatch({ changes: { from: 0, to: 4, insert: '## Yo' } });
    await w.setProps({ modelValue: w.emitted<string[]>('update:modelValue')![0][0] });
    expect(w.find('.lm-markdown h2').text()).toBe('Yo');
  });

  it('keeps the same editor view across mode switches', async () => {
    const w = mountEditor();
    const get = () => (w.getComponent(CodeEditor).vm as unknown as { view(): EditorView }).view();
    const before = get();
    await w.setProps({ mode: 'view' });
    await w.setProps({ mode: 'edit' });
    expect(get()).toBe(before);
    expect(w.find('.cm-editor').isVisible()).toBe(true);
  });

  it('re-emits open-link from the rendered view', () => {
    const w = mountEditor({ mode: 'view' });
    w.getComponent(MarkdownView).vm.$emit('open-link', 'https://example.com');
    expect(w.emitted('open-link')).toEqual([['https://example.com']]);
  });

  it('switches panes when the mode prop changes', async () => {
    const w = mountEditor();
    expect(w.find('.lm-markdown').exists()).toBe(false);
    await w.setProps({ mode: 'split' });
    expect(w.find('.lm-markdown').exists()).toBe(true);
    await w.setProps({ mode: 'view' });
    expect(w.find('.cm-editor').isVisible()).toBe(false);
  });

  it('labels the mode toolbar', () => {
    const bar = mountEditor().find('[role="toolbar"]');
    expect(bar.attributes('aria-label')).toBe('Editor mode');
  });
});
