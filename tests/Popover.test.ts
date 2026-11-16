import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Popover from '../src/components/Popover.vue';
import Tooltip from '../src/components/Tooltip.vue';

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

describe('Popover', () => {
  it('toggles its content from the trigger', async () => {
    wrapper = mount(Popover, {
      props: { ariaLabel: 'Activity' },
      slots: {
        default: '<button class="trigger">Open</button>',
        content: '<p class="body">Hi</p>',
      },
      attachTo: document.body,
    });
    expect(document.body.querySelector('.body')).toBeNull();
    await wrapper.find('.trigger').trigger('click');
    expect(wrapper.emitted('update:open')).toEqual([[true]]);
    expect(document.body.querySelector('.lm-popover .body')).not.toBeNull();
  });
});

describe('Tooltip', () => {
  it('renders the trigger without extra wrappers', () => {
    wrapper = mount(Tooltip, {
      props: { text: 'Refresh' },
      slots: { default: '<button class="trigger">R</button>' },
      attachTo: document.body,
    });
    expect(wrapper.find('button.trigger').exists()).toBe(true);
  });
});
