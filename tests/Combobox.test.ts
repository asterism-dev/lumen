import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
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

const options = () => [...document.body.querySelectorAll<HTMLElement>('[role="option"]')];

describe('Combobox extras', () => {
  it('marks disabled items with their reason and does not pick them', async () => {
    wrapper = mount(Combobox, {
      props: {
        modelValue: 'main',
        items: [items[0], { ...items[1], disabled: true, title: 'Archived' }],
        open: true,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const disabled = options()[1];
    expect(disabled.hasAttribute('data-disabled')).toBe(true);
    expect(disabled.getAttribute('title')).toBe('Archived');
    disabled.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('waits for beforeSelect and keeps the panel open with its error', async () => {
    let reject!: (e: Error) => void;
    const beforeSelect = vi.fn(() => new Promise((_, r) => (reject = r)));
    wrapper = mount(Combobox, {
      props: { modelValue: 'main', items, open: true, beforeSelect },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    options()[1].click();
    await wrapper.vm.$nextTick();
    expect(beforeSelect).toHaveBeenCalledWith('dev', expect.any(AbortSignal));
    expect(options()[1].getAttribute('aria-busy')).toBe('true');
    reject(new Error('Load failed'));
    await flushPromises();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('update:open')).toBeUndefined();
    expect(document.body.querySelector('.lm-combobox__error')!.textContent).toBe('Load failed');
  });

  it('commits after beforeSelect resolves and aborts a superseded pick', async () => {
    const signals: AbortSignal[] = [];
    const resolvers: (() => void)[] = [];
    const beforeSelect = (_: string, signal: AbortSignal) => {
      signals.push(signal);
      return new Promise<void>((r) => resolvers.push(r));
    };
    wrapper = mount(Combobox, {
      props: { modelValue: '', items, open: true, beforeSelect },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    options()[0].click();
    options()[1].click();
    await wrapper.vm.$nextTick();
    expect(signals[0].aborted).toBe(true);
    resolvers[0]();
    resolvers[1]();
    await flushPromises();
    expect(wrapper.emitted('update:modelValue')).toEqual([['dev']]);
    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });

  it('emits select with the beforeSelect result after committing', async () => {
    wrapper = mount(Combobox, {
      props: { modelValue: '', items, open: true, beforeSelect: async (v: string) => ({ v }) },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    options()[1].click();
    await flushPromises();
    expect(wrapper.emitted('update:modelValue')).toEqual([['dev']]);
    expect(wrapper.emitted('select')).toEqual([['dev', { v: 'dev' }]]);
  });

  it('passes the raw beforeSelect error to the error slot', async () => {
    const failure = Object.assign(new Error('Needs setup'), { kind: 'needs_setup' });
    wrapper = mount(Combobox, {
      props: { modelValue: '', items, open: true, beforeSelect: () => Promise.reject(failure) },
      slots: {
        error:
          '<template #error="{ error }"><button class="fix">{{ error.kind }}</button></template>',
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    options()[0].click();
    await flushPromises();
    expect(document.body.querySelector('.lm-combobox__error .fix')!.textContent).toBe(
      'needs_setup',
    );
  });

  it('applies item classes, exposes item data and renders search-start first', async () => {
    wrapper = mount(Combobox, {
      props: {
        modelValue: '',
        items: [{ value: 'a', label: 'A', class: 'top', data: { author: 'kim' } }],
        open: true,
      },
      slots: {
        'search-start': '<button class="provider">P</button>',
        item: '<template #item="{ item }">{{ item.data.author }}</template>',
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(options()[0].classList).toContain('top');
    expect(options()[0].textContent).toContain('kim');
    const search = document.body.querySelector('.lm-combobox__search')!;
    expect(search.firstElementChild!.classList).toContain('provider');
  });

  it('uses the trigger slot as the trigger', async () => {
    wrapper = mount(Combobox, {
      props: { modelValue: 'dev', items },
      slots: {
        trigger:
          '<template #trigger="{ label }"><button class="mine">{{ label }}</button></template>',
      },
      attachTo: document.body,
    });
    expect(wrapper.find('.lm-combobox').exists()).toBe(false);
    await wrapper.find('.mine').trigger('click');
    expect(wrapper.find('.mine').text()).toBe('origin/dev');
    expect(wrapper.emitted('update:open')).toEqual([[true]]);
  });
});
