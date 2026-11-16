import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContextMenu from '../src/components/ContextMenu.vue';
import Menu from '../src/components/Menu.vue';

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

const menuItems = () => [...document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')];

describe('Menu', () => {
  it('runs the item action on select', async () => {
    const rename = vi.fn();
    wrapper = mount(Menu, {
      props: {
        open: true,
        items: [
          { label: 'Rename', action: rename, checked: true },
          { label: 'Delete', action: () => {}, danger: true },
        ],
      },
      slots: { default: '<button>Open</button>' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const [first, second] = menuItems();
    expect(first.textContent).toContain('✓');
    expect(second.classList).toContain('lm-menu__item--danger');
    first.click();
    expect(rename).toHaveBeenCalledOnce();
  });
});

describe('ContextMenu', () => {
  it('opens on contextmenu', async () => {
    wrapper = mount(ContextMenu, {
      props: { items: [{ label: 'Copy', action: () => {} }] },
      slots: { default: '<div class="target">Row</div>' },
      attachTo: document.body,
    });
    await wrapper.find('.target').trigger('contextmenu', { clientX: 5, clientY: 5 });
    await wrapper.vm.$nextTick();
    expect(menuItems().map((i) => i.textContent?.trim())).toEqual(['Copy']);
  });
});
