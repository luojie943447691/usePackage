import { defineComponent, ref } from 'vue';
import { useDraggable } from '.';
import { resolveUnref } from '../resolveUnref';

export const Demo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const rootRef1 = ref<HTMLElement | null>(null);
    const { style } = useDraggable(rootRef, {
      preventDefault: true,
      stopPropagation: true,
    });

    const { style:style2 } = useDraggable(rootRef1, {
      preventDefault: true,
      stopPropagation: true,
    });
    return () => (
      <div>
          123
        <div class={['un-bg-black un-h-200px un-w-300px un-fixed']} style={resolveUnref(style)} ref={rootRef}></div>
        <div class={['un-bg-gray un-h-200px un-w-300px un-fixed']} style={resolveUnref(style2)} ref={rootRef1}></div>
      </div>
    );
  },
});
