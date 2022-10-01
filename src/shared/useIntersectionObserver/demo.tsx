import { defineComponent, ref } from 'vue';
import { useIntersectionObserver } from '.';

export const Demo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const targetRef = ref<HTMLElement | null>(null);
    const { visibility } = useIntersectionObserver(targetRef, () => {}, { root: rootRef });
    return () => (
      <>
        <div ref={rootRef} class="un-h-full un-w-500px un-bg-gray un-relative un-mx-200px" style={{"overflow":"scroll"}}>
          <div ref={targetRef} class="un-h-200px un-w-200px un-bg-black un-absolute un-top-2000px"></div>
        </div>
        <div class="un-h-50px un-w-230px un-bg-red un-fixed un-bottom-0 un-right-0">
          visibility:{`${visibility.value}`}
        </div>
      </>
    );
  },
});
