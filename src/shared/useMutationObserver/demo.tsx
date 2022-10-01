import { defineComponent, ref } from 'vue';
import { useMutationObserver } from '.';

export const Demo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    useMutationObserver(rootRef);
    return () => (
      <div class="un-h-200% un-w-300px un-bg-gray un-relative">
        <textarea class="un-absolute un-top-120px un-w-200px un-h-100px un-bg-#ffffff un-z-1" ref={rootRef}>
          
        </textarea>
      </div>
    );
  },
});
