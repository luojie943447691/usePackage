import { defineComponent, ref } from 'vue';
import { useElementSize } from '.';

export const Demo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(rootRef);
    return () => (
      <div>
        <textarea ref={rootRef} cols="30" rows="10">
          width:{width.value.toFixed(0)};height:{height.value.toFixed(0)}
        </textarea>
      </div>
    );
  },
});
