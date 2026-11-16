import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DockviewApi } from 'dockview-vue';
import Dock from '../src/dock/Dock.vue';

const panels = [
  { id: 'one', title: 'One' },
  { id: 'two', title: 'Two' },
];
const slots = { one: 'content one', two: 'content two', three: 'content three' };

const defaultMatchMedia = window.matchMedia;
let wrapper: VueWrapper;
const mountDock = (props: Record<string, unknown> = {}) =>
  (wrapper = mount(Dock, { props: { panels, ...props }, slots, attachTo: document.body }));
const readyApi = () => wrapper.emitted('ready')![0][0] as DockviewApi;

afterEach(() => {
  wrapper.unmount();
  vi.stubGlobal('matchMedia', defaultMatchMedia);
});

function stubMobile() {
  vi.stubGlobal('matchMedia', () => ({
    matches: true,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe('Dock on mobile', () => {
  it('renders Tabs with the active panel slot', () => {
    stubMobile();
    mountDock({ active: 'two' });
    expect(wrapper.find('.lm-tabs').exists()).toBe(true);
    expect(wrapper.text()).toContain('content two');
    expect(wrapper.emitted('ready')).toBeUndefined();
  });

  it('switches the active panel via Tabs', async () => {
    stubMobile();
    mountDock({ active: 'one' });
    await wrapper.findAll('[role="tab"]')[1].trigger('mousedown', { button: 0, ctrlKey: false });
    expect(wrapper.emitted('update:active')?.[0]).toEqual(['two']);
  });

  it('keeps inactive panels mounted', () => {
    stubMobile();
    mountDock({ active: 'one' });
    expect(wrapper.text()).toContain('content two');
  });
});

describe('Dock on desktop', () => {
  it('emits ready with a dockview api holding all panels', async () => {
    mountDock();
    await flushPromises();
    expect(readyApi().panels.map((p) => p.id)).toEqual(['one', 'two']);
    expect(wrapper.find('.lm-tabs').exists()).toBe(false);
  });

  it('renders the panel slots', async () => {
    mountDock();
    await flushPromises();
    expect(wrapper.text()).toContain('content two');
  });

  it('adds and removes dockview panels when panels change', async () => {
    mountDock();
    await flushPromises();
    await wrapper.setProps({ panels: [panels[1], { id: 'three', title: 'Three' }] });
    expect(readyApi().panels.map((p) => p.id)).toEqual(['two', 'three']);
  });

  it('reports the active panel and follows external changes', async () => {
    mountDock({
      active: 'two',
      'onUpdate:active': (id: string) => wrapper.setProps({ active: id }),
    });
    await flushPromises();
    expect(readyApi().activePanel?.id).toBe('two');
    readyApi().getPanel('one')!.api.setActive();
    await flushPromises();
    expect(wrapper.emitted('update:active')?.at(-1)).toEqual(['one']);
    await wrapper.setProps({ active: 'two' });
    await flushPromises();
    expect(readyApi().activePanel?.id).toBe('two');
  });
});
