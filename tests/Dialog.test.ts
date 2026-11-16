import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Dialog from '../src/components/Dialog.vue';

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

const dialog = () => document.body.querySelector<HTMLElement>('[role="dialog"]');

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    wrapper = mount(Dialog, { props: { open: false, title: 'Quit' }, attachTo: document.body });
    expect(dialog()).toBeNull();
  });

  it('renders title, body and actions when open', async () => {
    wrapper = mount(Dialog, {
      props: { open: true, title: 'Quit', description: 'Sure?' },
      slots: { default: '<p class="body">Body</p>', actions: '<button>OK</button>' },
      attachTo: document.body,
    });
    await flushPromises();
    const el = dialog()!;
    expect(el.querySelector('.lm-dialog__title')!.textContent).toBe('Quit');
    expect(el.getAttribute('aria-labelledby')).toBeTruthy();
    expect(el.querySelector('.lm-dialog__description')!.textContent!.trim()).toBe('Sure?');
    expect(el.querySelector('.body')).not.toBeNull();
    expect(el.querySelector('.lm-dialog__actions button')!.textContent).toBe('OK');
  });

  it('requests close on Escape', async () => {
    wrapper = mount(Dialog, { props: { open: true, title: 'Quit' }, attachTo: document.body });
    await flushPromises();
    dialog()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });
});

describe('Dialog header', () => {
  it('renders the title slot and a close button when closable', async () => {
    wrapper = mount(Dialog, {
      props: { open: true, closable: true },
      slots: { title: 'Create Task in <select aria-label="Project"><option>A</option></select>' },
      attachTo: document.body,
    });
    await flushPromises();
    const el = dialog()!;
    const title = el.querySelector('.lm-dialog__title')!;
    expect(title.querySelector('select')).not.toBeNull();
    expect(el.getAttribute('aria-labelledby')).toBe(title.id);
    el.querySelector<HTMLElement>('[aria-label="Close"]')!.click();
    await flushPromises();
    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });

  it('has no close button by default', async () => {
    wrapper = mount(Dialog, { props: { open: true, title: 'Quit' }, attachTo: document.body });
    await flushPromises();
    expect(dialog()!.querySelector('[aria-label="Close"]')).toBeNull();
  });
});
