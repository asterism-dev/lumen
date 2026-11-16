import { mount } from '@vue/test-utils';
import { Plus } from '@lucide/vue';
import { describe, expect, it } from 'vitest';
import Button from '../src/components/Button.vue';

describe('Button', () => {
  it('renders a type=button by default', () => {
    expect(mount(Button).attributes('type')).toBe('button');
  });

  it.each(['accent', 'danger'] as const)('adds lm-button--%s', (variant) => {
    expect(mount(Button, { props: { variant } }).classes()).toContain(`lm-button--${variant}`);
  });

  it('marks icon-only buttons', () => {
    expect(mount(Button, { props: { icon: Plus } }).classes()).toContain('lm-button--icon-only');
  });

  it('is not icon-only with slot content', () => {
    const wrapper = mount(Button, { props: { icon: Plus }, slots: { default: 'Add' } });
    expect(wrapper.classes()).not.toContain('lm-button--icon-only');
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('emits click when enabled', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
