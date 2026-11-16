import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import Table from '../src/components/Table.vue';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'size', label: 'Size', align: 'right' as const },
];
const rows = [
  { id: 'a', name: 'Alpha', size: 10 },
  { id: 'b', name: 'Beta', size: null },
  { id: 'c', name: 'Gamma' },
];

let wrapper: ReturnType<typeof mount>;
afterEach(() => wrapper.unmount());

describe('Table', () => {
  it('renders headers and one row per item keyed by rowKey', () => {
    wrapper = mount(Table, { props: { columns, rows, rowKey: 'id' } });
    expect(wrapper.findAll('th').map((th) => th.text())).toEqual(['Name', 'Size']);
    expect(wrapper.findAll('tbody tr')).toHaveLength(3);
    expect(
      wrapper
        .findAll('tbody tr')[0]
        .findAll('td')
        .map((td) => td.text()),
    ).toEqual(['Alpha', '10']);
  });

  it('uses cell and header slots when given', () => {
    wrapper = mount(Table, {
      props: { columns, rows, rowKey: 'id' },
      slots: {
        'header-name': ({ column }: { column: { label: string } }) =>
          h('button', `sort ${column.label}`),
        'cell-name': ({ row, value }: { row: Record<string, unknown>; value: unknown }) =>
          h('b', `${row.id}:${value}`),
      },
    });
    expect(wrapper.find('th button').text()).toBe('sort Name');
    expect(wrapper.find('tbody td b').text()).toBe('a:Alpha');
  });

  it('renders the empty slot when rows is []', () => {
    wrapper = mount(Table, {
      props: { columns, rows: [], rowKey: 'id' },
      slots: { empty: () => h('p', { class: 'none' }, 'Nothing here') },
    });
    expect(wrapper.find('.none').text()).toBe('Nothing here');
    expect(wrapper.findAll('tbody tr')).toHaveLength(1);
    expect(wrapper.find('tbody td').attributes('colspan')).toBe('2');
  });

  it('renders no empty row without an empty slot', () => {
    wrapper = mount(Table, { props: { columns, rows: [], rowKey: 'id' } });
    expect(wrapper.findAll('tbody tr')).toHaveLength(0);
  });

  it('renders null and undefined values as empty cells', () => {
    wrapper = mount(Table, { props: { columns, rows, rowKey: 'id' } });
    const trs = wrapper.findAll('tbody tr');
    expect(trs[1].findAll('td')[1].text()).toBe('');
    expect(trs[2].findAll('td')[1].text()).toBe('');
  });

  it('sets aria-sort from sortState and right alignment class', () => {
    wrapper = mount(Table, {
      props: { columns, rows, rowKey: 'id', sortState: { size: 'descending' } },
    });
    const ths = wrapper.findAll('th');
    expect(ths[0].attributes('aria-sort')).toBeUndefined();
    expect(ths[1].attributes('aria-sort')).toBe('descending');
    expect(ths[1].classes()).toContain('lm-table__th--right');
  });

  it('hides the header on request', () => {
    wrapper = mount(Table, { props: { columns, rows, rowKey: 'id', hideHeader: true } });
    expect(wrapper.find('thead').exists()).toBe(false);
  });

  it('emits row-click only for clickable rows, also via Enter', async () => {
    wrapper = mount(Table, {
      props: {
        columns,
        rows,
        rowKey: 'id',
        rowClickable: (row: Record<string, unknown>) => row.id !== 'b',
      },
    });
    const trs = wrapper.findAll('tbody tr');
    expect(trs[0].classes()).toContain('lm-table__row');
    expect(trs[0].classes()).toContain('lm-table__row--clickable');
    expect(trs[1].attributes('tabindex')).toBeUndefined();
    await trs[0].trigger('click');
    await trs[1].trigger('click');
    await trs[2].trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('row-click')).toEqual([[rows[0]], [rows[2]]]);
  });
});

describe('Table footer and column classes', () => {
  interface Item {
    id: string;
    name: string;
    size: number;
  }
  const items: Item[] = [{ id: 'a', name: 'Alpha', size: 10 }];

  it('accepts interface rows, applies column classes and renders footer slots', () => {
    wrapper = mount(Table, {
      props: {
        columns: [
          { key: 'name', label: 'Name', class: 'mono' },
          { key: 'size', label: 'Size', align: 'right' as const },
        ],
        rows: items,
        rowKey: 'id',
      },
      slots: { 'footer-name': () => 'Total', 'footer-size': () => '10' },
    });
    expect(wrapper.find('th').classes()).toContain('mono');
    expect(wrapper.find('tbody td').classes()).toContain('mono');
    const foot = wrapper.findAll('tfoot td');
    expect(foot.map((td) => td.text())).toEqual(['Total', '10']);
    expect(foot[1].classes()).toContain('lm-table__td--right');
  });

  it('renders no tfoot without footer slots', () => {
    wrapper = mount(Table, { props: { columns, rows, rowKey: 'id' } });
    expect(wrapper.find('tfoot').exists()).toBe(false);
  });
});
