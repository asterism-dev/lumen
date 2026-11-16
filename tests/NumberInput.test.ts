import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NumberInput from '../src/components/NumberInput.vue';

describe('NumberInput', () => {
  it('emits numbers, and null when cleared', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 1 }, attrs: { min: 1 } });
    expect(wrapper.attributes('type')).toBe('number');
    expect(wrapper.attributes('min')).toBe('1');
    await wrapper.find('input').setValue('42');
    await wrapper.find('input').setValue('');
    expect(wrapper.emitted('update:modelValue')).toEqual([[42], [null]]);
  });
});
