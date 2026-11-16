import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { h } from 'vue';
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

  it('emits close from the tab close button', async () => {
    stubMobile();
    mountDock({ active: 'one' });
    await wrapper.find('[aria-label="Close Two"]').trigger('click');
    expect(wrapper.emitted('close')).toEqual([['two']]);
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
    await flushPromises();
    expect(readyApi().panels.map((p) => p.id)).toEqual(['two', 'three']);
    expect(wrapper.text()).toContain('content three');
  });

  it('updates the tab title when a panel title changes', async () => {
    mountDock();
    await flushPromises();
    await wrapper.setProps({ panels: [{ id: 'one', title: 'Uno' }, panels[1]] });
    await flushPromises();
    expect(readyApi().getPanel('one')!.title).toBe('Uno');
    expect(wrapper.find('.lm-dock-tab').text()).toBe('Uno');
  });

  it('renders the tab with title and icon', async () => {
    const Icon = () => h('svg', { class: 'test-icon' });
    mountDock({ panels: [{ id: 'one', title: 'One', icon: Icon }, panels[1]] });
    await flushPromises();
    const tab = wrapper.find('.lm-dock-tab');
    expect(tab.text()).toBe('One');
    expect(tab.find('.test-icon').exists()).toBe(true);
  });

  it('emits close without removing the panel itself', async () => {
    mountDock();
    await flushPromises();
    await wrapper.find('[aria-label="Close One"]').trigger('click');
    expect(wrapper.emitted('close')).toEqual([['one']]);
    expect(readyApi().panels.map((p) => p.id)).toEqual(['one', 'two']);
    await wrapper.setProps({ panels: [panels[1]] });
    expect(readyApi().panels.map((p) => p.id)).toEqual(['two']);
  });

  it('drops the old api on mobile and emits ready again on desktop', async () => {
    const listeners = new Set<(e: { matches: boolean }) => void>();
    const mql = (matches: boolean) => ({
      matches,
      addEventListener: (_: string, l: (e: { matches: boolean }) => void) => listeners.add(l),
      removeEventListener: (_: string, l: (e: { matches: boolean }) => void) => listeners.delete(l),
    });
    vi.stubGlobal('matchMedia', () => mql(false));
    mountDock({ active: 'one' });
    await flushPromises();
    const oldApi = readyApi();
    const addPanel = vi.spyOn(oldApi, 'addPanel');
    const getPanel = vi.spyOn(oldApi, 'getPanel');

    listeners.forEach((l) => l({ matches: true }));
    await flushPromises();
    expect(wrapper.find('.lm-tabs').exists()).toBe(true);
    await wrapper.setProps({ panels: [...panels, { id: 'three', title: 'Three' }], active: 'two' });
    await flushPromises();
    expect(addPanel).not.toHaveBeenCalled();
    expect(getPanel).not.toHaveBeenCalled();

    listeners.forEach((l) => l({ matches: false }));
    await flushPromises();
    expect(wrapper.emitted('ready')).toHaveLength(2);
    expect(wrapper.emitted('ready')![1][0]).not.toBe(oldApi);
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
