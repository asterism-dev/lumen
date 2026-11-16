import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import Tabs from '../src/components/Tabs.vue';

const tabs = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

let wrapper: ReturnType<typeof make>;
const make = () =>
  mount(Tabs, {
    props: { tabs, modelValue: 'a' },
    slots: { a: 'panel A', b: 'panel B', c: 'panel C' },
    attachTo: document.body,
  });

afterEach(() => wrapper.unmount());

describe('Tabs', () => {
  it('shows only the active panel slot', () => {
    wrapper = make();
    expect(wrapper.text()).toContain('panel A');
    expect(wrapper.text()).not.toContain('panel B');
  });

  it('emits the clicked tab value', async () => {
    wrapper = make();
    await wrapper.findAll('[role="tab"]')[1].trigger('mousedown', { button: 0, ctrlKey: false });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });

  it('activates the next tab with ArrowRight', async () => {
    wrapper = make();
    const triggers = wrapper.findAll('[role="tab"]');
    (triggers[0].element as HTMLElement).focus();
    await nextTick();
    await triggers[0].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });
});
