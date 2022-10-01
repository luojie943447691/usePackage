import { defineComponent, ref } from 'vue';
import { onClickOutside } from '.';

export const Demo = defineComponent({
  setup() {
    const showRef = ref<boolean>(false);
    const modalRef = ref<HTMLElement | null>(null);

    onClickOutside(modalRef,() => {
      showRef.value = false
    })

    return () => (
      <div class="un-relative">
        <button onClick={() => (showRef.value = true)}>打开</button>

        {showRef.value && (
          <div ref={modalRef} class="un-absolute un-w-100px un-h-100px un-bg-pink un-left-100px un-top-100px">
            这是modal
          </div>
        )}
      </div>
    );
  },
});
