import { watch } from 'vue';
import { defineComponent, ref } from 'vue';
import { useClipboard } from '.';

export const Demo = defineComponent({
  setup() {
    const textValue = ref<string>();
    const { excute } = useClipboard();
    return () => (
      <>
        <textarea id="" cols="30" rows="10" v-model={textValue.value}></textarea>
        <button
          onClick={async () => {
            await excute(textValue.value);
          }}>
          复制
        </button>
      </>
    );
  },
});
