import { defineComponent, ref } from 'vue';
import { useElementVisibility } from '.';

export const Demo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const { visibility } = useElementVisibility(rootRef);
    return () => (
      <>
        <div class="un-h-2500px un-w-3000px un-bg-gray un-relative">
          <div ref={rootRef} class="un-h-200px un-w-300px un-bg-black un-absolute un-top-2000px un-left-2000px"></div>
        </div>
        <div class="un-h-50px un-w-230px un-bg-red un-fixed un-bottom-0 un-right-0">
          visibility:{`${visibility.value}`}
        </div>
      </>
    );
  },
});
