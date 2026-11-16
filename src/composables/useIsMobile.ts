import { onScopeDispose, readonly, ref, type Ref } from 'vue';

export const MOBILE_QUERY = '(max-width: 767.98px)';

export function useIsMobile(): Readonly<Ref<boolean>> {
  const mql = window.matchMedia(MOBILE_QUERY);
  const isMobile = ref(mql.matches);
  const onChange = (e: { matches: boolean }) => (isMobile.value = e.matches);
  mql.addEventListener('change', onChange);
  onScopeDispose(() => mql.removeEventListener('change', onChange));
  return readonly(isMobile);
}
