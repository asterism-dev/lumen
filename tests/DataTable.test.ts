import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import DataTable from '../src/table/DataTable.vue';

const columns = [
  { key: 'name', label: 'Name', filterable: true },
  { key: 'size', label: 'Size', align: 'right' as const },
];
const rows = [
  { id: 'a', name: 'beta', size: 10 },
  { id: 'b', name: 'Alpha', size: 9 },
  { id: 'c', name: 'gamma', size: null },
];

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

const column = (index: number) =>
  wrapper.findAll('tbody tr').map((tr) => tr.findAll('td')[index].text());
const sortButton = (label: string) =>
  wrapper.findAll('th button').find((button) => button.text() === label)!;

function mountTable(props: Record<string, unknown> = {}, slots = {}) {
  wrapper = mount(DataTable, { props: { columns, rows, rowKey: 'id', ...props }, slots });
}

describe('DataTable', () => {
  it('sorts ascending, descending, then off on repeated header clicks', async () => {
    mountTable();
    expect(column(0)).toEqual(['beta', 'Alpha', 'gamma']);
    await sortButton('Name').trigger('click');
    expect(column(0)).toEqual(['Alpha', 'beta', 'gamma']);
    await sortButton('Name').trigger('click');
    expect(column(0)).toEqual(['gamma', 'beta', 'Alpha']);
    await sortButton('Name').trigger('click');
    expect(column(0)).toEqual(['beta', 'Alpha', 'gamma']);
  });

  it('sorts numbers numerically and keeps null last in both directions', async () => {
    mountTable();
    await sortButton('Size').trigger('click');
    expect(column(1)).toEqual(['9', '10', '']);
    await sortButton('Size').trigger('click');
    expect(column(1)).toEqual(['10', '9', '']);
  });

  it('filters case-insensitively across all columns', async () => {
    mountTable();
    await wrapper.find('input[type="search"]').setValue('ALP');
    expect(column(0)).toEqual(['Alpha']);
    await wrapper.find('input[type="search"]').setValue('10');
    expect(column(0)).toEqual(['beta']);
  });

  it('applies column filters', async () => {
    mountTable();
    expect(wrapper.findAll('th input')).toHaveLength(1);
    await wrapper.find('th input').setValue('MM');
    expect(column(0)).toEqual(['gamma']);
    expect(wrapper.emitted('update:columnFilters')?.at(-1)).toEqual([{ name: 'MM' }]);
  });

  it('accepts filter and columnFilters from outside', async () => {
    mountTable();
    await wrapper.setProps({ filter: 'alp' });
    expect(column(0)).toEqual(['Alpha']);
    await wrapper.setProps({ filter: '', columnFilters: { name: 'mm' } });
    expect(column(0)).toEqual(['gamma']);
    expect((wrapper.find('th input').element as HTMLInputElement).value).toBe('mm');
  });

  it('emits update:sorting and accepts sorting from outside', async () => {
    mountTable();
    await sortButton('Size').trigger('click');
    expect(wrapper.emitted('update:sorting')?.at(-1)).toEqual([[{ id: 'size', desc: false }]]);
    await wrapper.setProps({ sorting: [{ id: 'name', desc: true }] });
    expect(column(0)).toEqual(['gamma', 'beta', 'Alpha']);
  });

  it('shows the empty slot when the filter matches nothing', async () => {
    mountTable({}, { empty: () => h('span', 'Nothing here') });
    await wrapper.find('input[type="search"]').setValue('zzz');
    expect(wrapper.find('.lm-table__empty').text()).toBe('Nothing here');
  });

  it('sets aria-sort on the sorted header', async () => {
    mountTable();
    const th = () => wrapper.findAll('th')[0];
    expect(th().attributes('aria-sort')).toBeUndefined();
    await sortButton('Name').trigger('click');
    expect(th().attributes('aria-sort')).toBe('ascending');
    await sortButton('Name').trigger('click');
    expect(th().attributes('aria-sort')).toBe('descending');
  });

  it('renders plain labels for non-sortable columns and uses the placeholder', () => {
    mountTable({
      columns: [{ key: 'name', label: 'Name', sortable: false }],
      filterPlaceholder: 'Search…',
    });
    expect(wrapper.find('th button').exists()).toBe(false);
    expect(wrapper.find('th').text()).toBe('Name');
    expect(wrapper.find('input[type="search"]').attributes('aria-label')).toBe('Search…');
  });

  it('passes cell slots through', () => {
    mountTable({}, { 'cell-name': ({ value }: { value: unknown }) => h('b', `<${value}>`) });
    expect(column(0)).toEqual(['<beta>', '<Alpha>', '<gamma>']);
  });
});
