import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Textarea from '../src/components/Textarea.vue';

describe('Textarea', () => {
  it('emits update:modelValue and sets rows', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', rows: 5 } });
    expect(wrapper.attributes('rows')).toBe('5');
    await wrapper.find('textarea').setValue('abc');
    expect(wrapper.emitted('update:modelValue')).toEqual([['abc']]);
  });
});
