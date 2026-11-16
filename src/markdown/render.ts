import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';
import MarkdownIt from 'markdown-it';

const md: InstanceType<typeof MarkdownIt> = new MarkdownIt({
  html: true,
  linkify: true,
  highlight(code, lang): string {
    if (!lang || !hljs.getLanguage(lang)) return md.utils.escapeHtml(code);
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
  },
});

const FORBID_TAGS = [
  'form',
  'button',
  'input',
  'select',
  'textarea',
  'area',
  'map',
  'math',
  'style',
];

export function renderMarkdown(source: string): string {
  if (!DOMPurify.isSupported)
    throw new Error('DOMPurify needs a DOM; refusing to return unsanitized HTML');
  return DOMPurify.sanitize(md.render(source), {
    FORBID_TAGS,
    FORBID_ATTR: ['style'],
    SANITIZE_NAMED_PROPS: true,
  });
}
