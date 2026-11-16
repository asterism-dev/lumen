<script lang="ts">
import { defineComponent, inject, type InjectionKey, type Slots } from 'vue';

export const dockSlotsKey: InjectionKey<Slots> = Symbol('lm-dock-slots');

export default defineComponent({
  props: { params: { type: Object, required: true } },
  setup(props) {
    const slots = inject(dockSlotsKey, {});
    return () => slots[(props.params as { params: { id: string } }).params.id]?.();
  },
});
</script>
