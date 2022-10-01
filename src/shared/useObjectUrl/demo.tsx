import { defineComponent, ref, watch } from 'vue';
import { useObjectUrl } from '.';

export const Demo = defineComponent({
  setup() {
    const fileRef = ref<HTMLInputElement | null>(null);
    const file = ref<File | null>(null);
    const { url } = useObjectUrl(file);

    const change = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length > 0) {
        file.value = files[0];
      } else {
        file.value = null;
      }
    };

    return () => (
      <>
        <input type="file" ref={fileRef} onChange={change} />
        {url.value ? <img src={url.value}/> : null}
      </>
    );
  },
});
