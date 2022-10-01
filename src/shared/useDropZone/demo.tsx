import { defineComponent, ref, watch } from 'vue';
import vueSvg from '@/assets/vue.svg';
import { useDropZone } from '../useDropZone';
export const Demo = defineComponent({
  setup() {
    const filesData = ref<{ name: string; size: number; type: string; lastModified: number }[]>([]);
    function onDrop(files: File[] | null) {
      filesData.value = [];
      if (files) {
        filesData.value = files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        }));
      }
    }
    const rootRef = ref<HTMLElement | null>(null);
    const { isOverDropZone } = useDropZone(rootRef, onDrop);
    return () => (
      <>
        <img src={vueSvg} alt="" />
        <div class="un-w-200px un-h-200px un-bg-gray" ref={rootRef}>
          {`isOverDropZone:${isOverDropZone.value}`}
          {filesData.value &&
            filesData.value.map((file, index) => {
              return (
                <div key={index} class="w-200px bg-black-200/10 ma-2 pa-6">
                  <p>Name: {file.name}</p>
                  <p>Size: {file.size}</p>
                  <p>Type: {file.type}</p>
                  <p>Last modified: {file.lastModified}</p>
                </div>
              );
            })}
        </div>
      </>
    );
  },
});
