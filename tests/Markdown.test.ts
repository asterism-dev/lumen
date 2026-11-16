import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import MarkdownView from '../src/markdown/MarkdownView.vue';
import { renderMarkdown } from '../src/markdown/render';

describe('renderMarkdown', () => {
  it('renders headings', () => expect(renderMarkdown('# Hi')).toContain('<h1>Hi</h1>'));
  it('strips event handlers', () =>
    expect(renderMarkdown('<img src=x onerror="alert(1)">')).not.toContain('onerror'));
  it('strips script tags', () =>
    expect(renderMarkdown('<script>alert(1)</script>')).not.toContain('<script'));
  it('drops javascript: links', () =>
    expect(renderMarkdown('[x](javascript:alert(1))')).not.toMatch(/href=.?javascript:/i));
  it('highlights fenced code', () =>
    expect(renderMarkdown('```ts\nconst a = 1\n```')).toContain('hljs-keyword'));
  it('escapes code with an unknown language', () => {
    const html = renderMarkdown('```nope\n<b>x</b>\n```');
    expect(html).toContain('&lt;b&gt;');
    expect(html).not.toContain('<b>');
  });
  it('escapes code without a language', () =>
    expect(renderMarkdown('```\n<i>x</i>\n```')).toContain('&lt;i&gt;'));
  it('linkifies bare urls', () =>
    expect(renderMarkdown('see https://x.y')).toContain('<a href="https://x.y"'));
});

describe('MarkdownView', () => {
  const wrappers: ReturnType<typeof mount>[] = [];
  afterEach(() => wrappers.splice(0).forEach((w) => w.unmount()));

  function mountView(source: string) {
    const w = mount(MarkdownView, { props: { source }, attachTo: document.body });
    wrappers.push(w);
    return w;
  }

  it('renders sanitized markdown inside .lm-markdown', () => {
    const w = mountView('# Hi\n<script>x</script>');
    expect(w.classes()).toContain('lm-markdown');
    expect(w.find('h1').text()).toBe('Hi');
    expect(w.find('script').exists()).toBe(false);
  });

  it('updates when source changes', async () => {
    const w = mountView('# A');
    await w.setProps({ source: '# B' });
    expect(w.find('h1').text()).toBe('B');
  });

  it('emits open-link instead of navigating', async () => {
    const w = mountView('[x](https://x.y)');
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    w.find('a').element.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(w.emitted('open-link')).toEqual([['https://x.y']]);
  });

  it('handles clicks on elements nested in a link', async () => {
    const w = mountView('[**bold**](https://x.y)');
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    w.find('strong').element.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(w.emitted('open-link')).toEqual([['https://x.y']]);
  });

  it('ignores clicks outside links', async () => {
    const w = mountView('# Hi');
    await w.find('h1').trigger('click');
    expect(w.emitted('open-link')).toBeUndefined();
  });
});
