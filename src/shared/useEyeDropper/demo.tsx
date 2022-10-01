import { defineComponent, ref } from 'vue';
import { useEyeDropper } from '.';

export const Demo = defineComponent({
  setup() {
    const targetRef = ref<HTMLElement | null>(null);
    const { open, sRGBHex } = useEyeDropper(targetRef);
    return () => (
      <>
        <button ref={targetRef}>选择颜色</button>
        {sRGBHex.value}
      </>
    );
  },
});
