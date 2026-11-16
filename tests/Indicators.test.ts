import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Badge from '../src/components/Badge.vue';
import Kbd from '../src/components/Kbd.vue';
import StatusDot from '../src/components/StatusDot.vue';

describe('Kbd', () => {
  it('renders a kbd element', () => {
    const wrapper = mount(Kbd, { slots: { default: '⌘K' } });
    expect(wrapper.element.tagName).toBe('KBD');
    expect(wrapper.text()).toBe('⌘K');
  });
});

describe('Badge', () => {
  it('applies the tone and renders as the given element', () => {
    const wrapper = mount(Badge, {
      props: { tone: 'merged', as: 'a' },
      attrs: { href: '#' },
      slots: { default: '#12' },
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.classes()).toContain('lm-badge--merged');
  });
});

describe('StatusDot', () => {
  it('is an image labelled with its status', () => {
    const wrapper = mount(StatusDot, { props: { tone: 'waiting', label: 'Waiting for input' } });
    expect(wrapper.attributes('role')).toBe('img');
    expect(wrapper.attributes('aria-label')).toBe('Waiting for input');
    expect(wrapper.classes()).toContain('lm-status-dot--waiting');
  });
});

describe('Badge and StatusDot variants', () => {
  it('renders the outline pill and the accent tone', () => {
    expect(mount(Badge, { props: { variant: 'outline' } }).classes()).toContain(
      'lm-badge--outline',
    );
    expect(mount(StatusDot, { props: { tone: 'accent', label: 'New' } }).classes()).toContain(
      'lm-status-dot--accent',
    );
  });
});
