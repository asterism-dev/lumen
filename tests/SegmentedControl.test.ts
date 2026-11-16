import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SegmentedControl from '../src/components/SegmentedControl.vue';

const options = [
  { value: 'edit', label: 'Edit' },
  { value: 'view', label: 'View' },
  { value: 'split', label: 'Split' },
];

const make = () =>
  mount(SegmentedControl, { props: { options, modelValue: 'edit' }, attachTo: document.body });

describe('SegmentedControl', () => {
  it('marks the model value as active', () => {
    const items = make().findAll('button');
    expect(items[0].attributes('data-state')).toBe('on');
    expect(items[1].attributes('data-state')).toBe('off');
  });

  it('emits the clicked option', async () => {
    const wrapper = make();
    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['view']);
  });

  it('keeps the selection when the active option is clicked again', async () => {
    const wrapper = make();
    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('moves focus with ArrowRight', async () => {
    const wrapper = make();
    const items = wrapper.findAll('button');
    (items[0].element as HTMLElement).focus();
    await nextTick();
    await items[0].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(document.activeElement).toBe(items[1].element);
  });
});
