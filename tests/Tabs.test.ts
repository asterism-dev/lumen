import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, onMounted } from 'vue';
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

  it('emits close without activating the tab when closable', async () => {
    wrapper = mount(Tabs, {
      props: { tabs, modelValue: 'a', closable: true },
      slots: { a: 'panel A', b: 'panel B', c: 'panel C' },
      attachTo: document.body,
    });
    const close = wrapper.find('[aria-label="Close Beta"]');
    expect(close.attributes('type')).toBe('button');
    await close.trigger('pointerdown');
    await close.trigger('mousedown', { button: 0 });
    await close.trigger('click');
    expect(wrapper.emitted('close')).toEqual([['b']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('renders no close buttons by default', () => {
    wrapper = make();
    expect(wrapper.find('.lm-tabs__close').exists()).toBe(false);
  });

  it('keeps inactive panels mounted and hidden with keepMounted', async () => {
    let mounts = 0;
    const Probe = defineComponent({
      setup() {
        onMounted(() => mounts++);
        return () => h('i', 'probe');
      },
    });
    wrapper = mount(Tabs, {
      props: { tabs, modelValue: 'a', keepMounted: true },
      slots: { a: () => h(Probe), b: 'panel B', c: 'panel C' },
      attachTo: document.body,
    });
    const panelB = wrapper.findAll('[role="tabpanel"]')[1];
    expect(panelB.text()).toBe('panel B');
    expect(panelB.attributes('data-state')).toBe('inactive');
    await wrapper.setProps({ modelValue: 'b' });
    await wrapper.setProps({ modelValue: 'a' });
    expect(mounts).toBe(1);
  });
});
