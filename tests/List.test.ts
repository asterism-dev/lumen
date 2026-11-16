import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import List from '../src/components/List.vue';
import ListItem from '../src/components/ListItem.vue';

let wrapper: ReturnType<typeof make>;
const make = () =>
  mount(List, {
    props: { modelValue: null, ariaLabel: 'Tasks' },
    slots: {
      default: () => [
        h(ListItem, { value: 'a' }, () => 'Alpha'),
        h(ListItem, { value: 'b' }, { default: () => 'Beta', actions: () => h('button', 'Del') }),
        h(ListItem, { value: 'c', disabled: true }, () => 'Gamma'),
        h(ListItem, { value: 'd' }, () => 'Delta'),
      ],
    },
    attachTo: document.body,
  });

const items = () => wrapper.findAll('[role="option"]');

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = () => {};
});
afterEach(() => wrapper.unmount());

describe('List', () => {
  it('selects an item on click', async () => {
    wrapper = make();
    await items()[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']]);
  });

  it('selects with ArrowDown then Enter', async () => {
    wrapper = make();
    const content = wrapper.find('[role="listbox"]');
    await content.trigger('keydown', { key: 'ArrowDown' });
    await content.trigger('keydown', { key: 'ArrowDown' });
    await content.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']]);
  });

  it('does not select when an action button is clicked', async () => {
    wrapper = make();
    const button = wrapper.find('button');
    await button.trigger('pointerdown');
    await button.trigger('click');
    await button.trigger('keydown', { key: 'Enter' });
    await button.trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('skips disabled items', async () => {
    wrapper = make();
    await items()[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await items()[3].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['d']]);
  });
});
