import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Select from '../src/components/Select.vue';

const options = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two', disabled: true },
  { value: 3, label: 'Three' },
];

describe('Select', () => {
  it('renders native options and keeps value types', async () => {
    const wrapper = mount(Select, { props: { modelValue: 1, options } });
    expect(wrapper.findAll('option').map((o) => o.text())).toEqual(['One', 'Two', 'Three']);
    expect(wrapper.findAll('option')[1].attributes('disabled')).toBeDefined();
    await wrapper.find('select').setValue('3');
    expect(wrapper.emitted('update:modelValue')).toEqual([[3]]);
  });

  it('passes attributes to the select', () => {
    const wrapper = mount(Select, {
      props: { modelValue: 1, options },
      attrs: { 'aria-label': 'Count' },
    });
    expect(wrapper.find('select').attributes('aria-label')).toBe('Count');
  });
});

describe('Select nullable', () => {
  it('shows the placeholder for null and emits picked values', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: null as number | null, options, placeholder: 'Pick one' },
    });
    const first = wrapper.findAll('option')[0];
    expect(first.text()).toBe('Pick one');
    expect(first.attributes('disabled')).toBeDefined();
    expect((wrapper.find('select').element as HTMLSelectElement).selectedIndex).toBe(0);
    await wrapper.find('select').setValue('1');
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  });
});
