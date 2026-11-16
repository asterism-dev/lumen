import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TextInput from '../src/components/TextInput.vue';

describe('TextInput', () => {
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(TextInput, { props: { modelValue: '' } });
    await wrapper.find('input').setValue('abc');
    expect(wrapper.emitted('update:modelValue')).toEqual([['abc']]);
  });

  it('passes extra attributes to the input', () => {
    const wrapper = mount(TextInput, {
      props: { modelValue: '' },
      attrs: { 'aria-label': 'Name' },
    });
    expect(wrapper.find('input').attributes('aria-label')).toBe('Name');
  });

  it('supports password fields', () => {
    const wrapper = mount(TextInput, { props: { modelValue: '', type: 'password' } });
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });
});
