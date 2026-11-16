import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Combobox from '../src/components/Combobox.vue';

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

const items = [
  { value: 'main', label: 'main' },
  { value: 'dev', label: 'origin/dev' },
];

describe('Combobox', () => {
  it('shows the label of the current value, or the placeholder', async () => {
    wrapper = mount(Combobox, {
      props: { modelValue: 'dev', items, label: 'Branch', placeholder: 'Choose' },
    });
    expect(wrapper.text()).toContain('Branch');
    expect(wrapper.text()).toContain('origin/dev');
    await wrapper.setProps({ modelValue: '' });
    expect(wrapper.text()).toContain('Choose');
  });

  it('picks an item, closes and resets search on open', async () => {
    wrapper = mount(Combobox, {
      props: { modelValue: 'main', items, search: 'old', 'onUpdate:search': () => {} },
      attachTo: document.body,
    });
    await wrapper.find('.lm-combobox').trigger('click');
    expect(wrapper.emitted('update:search')).toEqual([['']]);
    const options = [...document.body.querySelectorAll<HTMLElement>('[role="option"]')];
    expect(options.map((o) => o.textContent?.trim())).toEqual(['main', 'origin/dev']);
    options[1].click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([['dev']]);
    expect(wrapper.emitted('update:open')).toEqual([[true], [false]]);
  });

  it('renders the empty state', async () => {
    wrapper = mount(Combobox, {
      props: { modelValue: '', items: [], open: true },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.lm-combobox__empty')!.textContent!.trim()).toBe(
      'No results.',
    );
  });
});
