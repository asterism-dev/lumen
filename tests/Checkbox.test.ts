import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Checkbox from '../src/components/Checkbox.vue';
import Switch from '../src/components/Switch.vue';

describe('Checkbox', () => {
  it('toggles on click and forwards attrs to the control', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
      attrs: { 'aria-label': 'Pick' },
      slots: { default: 'Label' },
    });
    const box = wrapper.find('[role="checkbox"]');
    expect(box.attributes('aria-label')).toBe('Pick');
    expect(wrapper.text()).toContain('Label');
    await box.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('shows the indeterminate state', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: 'indeterminate' } });
    expect(wrapper.find('[role="checkbox"]').attributes('aria-checked')).toBe('mixed');
  });

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, disabled: true } });
    await wrapper.find('[role="checkbox"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});

describe('Switch', () => {
  it('toggles on click', async () => {
    const wrapper = mount(Switch, { props: { modelValue: true }, attrs: { 'aria-label': 'On' } });
    const control = wrapper.find('[role="switch"]');
    expect(control.attributes('aria-checked')).toBe('true');
    expect(control.attributes('aria-label')).toBe('On');
    await control.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });
});
