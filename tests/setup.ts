import { vi } from 'vitest';

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}));

// CodeMirror measures text via Range rects, which jsdom lacks
const emptyRect = { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
Range.prototype.getBoundingClientRect = () => ({ ...emptyRect, toJSON: () => ({}) });
Range.prototype.getClientRects = () => [] as unknown as DOMRectList;

// reka scrolls highlighted listbox items into view; jsdom has no layout
Element.prototype.scrollIntoView = () => {};
