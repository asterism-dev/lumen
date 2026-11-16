import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RadioGroup from '../src/components/RadioGroup.vue';

const options = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
];

describe('RadioGroup', () => {
  it('renders options and emits the picked value', async () => {
    const wrapper = mount(RadioGroup, { props: { modelValue: 'all', options } });
    const radios = wrapper.findAll('[role="radio"]');
    expect(radios).toHaveLength(2);
    expect(radios[0].attributes('aria-checked')).toBe('true');
    expect(wrapper.text()).toContain('Open');
    await radios[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['open']]);
  });
});
