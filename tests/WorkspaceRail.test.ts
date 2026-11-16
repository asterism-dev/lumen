import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import WorkspaceRail from '../src/components/WorkspaceRail.vue';
import type { WorkspaceItem } from '../src/components/WorkspaceRail.vue';

const workspaces: WorkspaceItem[] = [
  { id: 'w1', name: 'Home', label: 'H', color: 'blue' },
  { id: 'w2', name: 'Work', label: 'W', color: 'teal', waiting: 3 },
  { id: 'w3', name: 'Misc', label: 'M' },
];

let wrapper: ReturnType<typeof make>;
const make = (active: string | null = 'w1') =>
  mount(WorkspaceRail, { props: { workspaces, active }, attachTo: document.body });
const tiles = () => wrapper.findAll('button.lm-rail__tile:not(.lm-rail__tile--add)');

afterEach(() => wrapper.unmount());

describe('WorkspaceRail', () => {
  it('renders labels in a labelled nav', () => {
    wrapper = make();
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Workspaces');
    expect(tiles().map((t) => t.text().replace(/\s*\d+$/, ''))).toEqual(['H', 'W', 'M']);
  });

  it('emits select with the workspace id', async () => {
    wrapper = make();
    await tiles()[2].trigger('click');
    expect(wrapper.emitted('select')).toEqual([['w3']]);
  });

  it('emits contextmenu with id and event', async () => {
    wrapper = make();
    await tiles()[1].trigger('contextmenu');
    const [id, event] = wrapper.emitted('contextmenu')![0];
    expect(id).toBe('w2');
    expect(event).toBeInstanceOf(MouseEvent);
  });

  it('emits add from the plus button', async () => {
    wrapper = make();
    await wrapper.find('[aria-label="New workspace"]').trigger('click');
    expect(wrapper.emitted('add')).toHaveLength(1);
  });

  it('marks the active tile with aria-pressed', () => {
    wrapper = make('w3');
    expect(tiles().map((t) => t.attributes('aria-pressed'))).toEqual(['false', 'false', 'true']);
  });

  it('shows the waiting badge only on inactive tiles', async () => {
    wrapper = make('w1');
    expect(wrapper.find('.lm-rail__badge').text()).toBe('3');
    await wrapper.setProps({ active: 'w2' });
    expect(wrapper.find('.lm-rail__badge').exists()).toBe(false);
  });

  it('labels a waiting inactive tile "Work, 3 waiting"', async () => {
    wrapper = make('w1');
    expect(tiles()[1].attributes('aria-label')).toBe('Work, 3 waiting');
    expect(tiles()[1].attributes('title')).toBe('Work, 3 waiting');
    await wrapper.setProps({ active: 'w2' });
    expect(tiles()[1].attributes('aria-label')).toBe('Work');
    expect(tiles()[0].attributes('title')).toBe('Home');
  });

  it('sets --tile to var(--ws-teal) for color teal', () => {
    wrapper = make();
    expect((tiles()[1].element as HTMLElement).style.getPropertyValue('--tile')).toBe(
      'var(--ws-teal)',
    );
    expect(tiles()[2].classes()).not.toContain('lm-rail__tile--colored');
  });
});
