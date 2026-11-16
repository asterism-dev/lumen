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

describe('RadioGroup custom variant', () => {
  it('renders the option slot as the radio itself, labelled by the option', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'all',
        options: [...options, { value: 'none', label: 'None', title: 'No color' }],
        variant: 'custom',
      },
      slots: {
        option: '<template #option="{ option, checked }"><i :data-on="checked" /></template>',
      },
    });
    expect(wrapper.find('.lm-radio__dot').exists()).toBe(false);
    const radios = wrapper.findAll('[role="radio"]');
    expect(radios[0].attributes('aria-label')).toBe('All');
    expect(radios[2].attributes('title')).toBe('No color');
    expect(radios[0].find('i').attributes('data-on')).toBe('true');
    await radios[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['open']);
  });
});
