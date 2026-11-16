import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import Checkbox from '../src/components/Checkbox.vue';
import Field from '../src/components/Field.vue';
import Form from '../src/components/Form.vue';
import TextInput from '../src/components/TextInput.vue';
import { required, minLength } from '../src/validation';
import type { Rule } from '../src/validation';

function textField(props: { rules?: Rule[]; error?: string; hint?: string } = {}) {
  const value = ref('');
  const wrapper = mount(
    defineComponent(
      () => () =>
        h(Field, { label: 'Name', ...props }, () =>
          h(TextInput, {
            modelValue: value.value,
            'onUpdate:modelValue': (v: string) => (value.value = v),
          }),
        ),
    ),
  );
  return { wrapper, value, input: () => wrapper.find('input') };
}

describe('Field', () => {
  it('links the label to the control', () => {
    const { wrapper, input } = textField();
    expect(wrapper.find('label').attributes('for')).toBe(input().attributes('id'));
    expect(input().attributes('aria-invalid')).toBeUndefined();
  });

  it('shows rule errors only after blur, then live', async () => {
    const { wrapper, input } = textField({ rules: [required(), minLength(3)] });
    expect(wrapper.find('.lm-field__error').exists()).toBe(false);
    await input().trigger('focusout');
    expect(wrapper.find('.lm-field__error').text()).toBe('Required');
    expect(input().attributes('aria-invalid')).toBe('true');
    expect(input().classes()).toContain('lm-invalid');
    const errorId = wrapper.find('.lm-field__error').attributes('id');
    expect(input().attributes('aria-describedby')).toContain(errorId);
    await input().setValue('ab');
    expect(wrapper.find('.lm-field__error').text()).toBe('Must be at least 3 characters');
    await input().setValue('abc');
    expect(wrapper.find('.lm-field__error').exists()).toBe(false);
    expect(input().attributes('aria-invalid')).toBeUndefined();
  });

  it('shows an external error immediately and prefers it', () => {
    const { wrapper } = textField({ rules: [required()], error: 'Name taken' });
    expect(wrapper.find('.lm-field__error').text()).toBe('Name taken');
  });

  it('describes the control with the hint', () => {
    const { wrapper, input } = textField({ hint: 'Lowercase' });
    expect(input().attributes('aria-describedby')).toBe(
      wrapper.find('.lm-field__hint').attributes('id'),
    );
  });

  it('marks a standalone control via the invalid prop', () => {
    const wrapper = mount(TextInput, { props: { modelValue: '', invalid: true } });
    expect(wrapper.attributes('aria-invalid')).toBe('true');
  });

  it('validates reka-based controls too', async () => {
    const wrapper = mount(
      defineComponent(
        () => () =>
          h(Field, { rules: [required('Accept the terms')] }, () =>
            h(Checkbox, { modelValue: false }),
          ),
      ),
    );
    await wrapper.find('[role="checkbox"]').trigger('focusout');
    expect(wrapper.find('.lm-field__error').text()).toBe('Accept the terms');
    expect(wrapper.find('[role="checkbox"]').classes()).toContain('lm-invalid');
  });
});

describe('Form', () => {
  it('blocks submit and reveals all errors while invalid', async () => {
    const name = ref('');
    const other = ref('');
    const wrapper = mount(
      defineComponent(
        () => () =>
          h(Form, null, () => [
            h(Field, { rules: [required()] }, () =>
              h(TextInput, {
                modelValue: name.value,
                'onUpdate:modelValue': (v: string) => (name.value = v),
              }),
            ),
            h(Field, { rules: [required()] }, () =>
              h(TextInput, {
                modelValue: other.value,
                'onUpdate:modelValue': (v: string) => (other.value = v),
              }),
            ),
          ]),
      ),
    );
    const form = wrapper.findComponent(Form);
    await wrapper.find('form').trigger('submit');
    expect(form.emitted('submit')).toBeUndefined();
    expect(wrapper.findAll('.lm-field__error')).toHaveLength(2);

    name.value = 'a';
    other.value = 'b';
    await nextTick();
    await wrapper.find('form').trigger('submit');
    expect(form.emitted('submit')).toHaveLength(1);
  });

  it('exposes validate()', async () => {
    const wrapper = mount(Form, {
      slots: {
        default: () => h(Field, { rules: [required()] }, () => h(TextInput, { modelValue: '' })),
      },
    });
    expect((wrapper.vm as unknown as { validate: () => boolean }).validate()).toBe(false);
  });
});
