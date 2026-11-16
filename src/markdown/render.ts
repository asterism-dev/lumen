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

export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(md.render(source));
}
