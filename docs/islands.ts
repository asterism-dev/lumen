import { createApp, type Component } from 'vue';
import '../src/theme/tokens.css';
import './islands.css';

const examples = import.meta.glob<{ default: Component }>('./examples/*.vue', { eager: true });

const syncTheme = () => {
  const dark = document.body.dataset.mdColorScheme === 'slate';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};
new MutationObserver(syncTheme).observe(document.body, {
  attributes: true,
  attributeFilter: ['data-md-color-scheme'],
});
syncTheme();

for (const el of document.querySelectorAll<HTMLElement>('[data-example]')) {
  const example = examples[`./examples/${el.dataset.example}.vue`];
  if (example) createApp(example.default).mount(el);
  else el.textContent = `Unknown example: ${el.dataset.example}`;
}
