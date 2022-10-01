import { onBeforeUnmount, ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { MaybeRef } from '../utils';

export const useObjectUrl = (file: MaybeRef<Blob | null | undefined>) => {
  const url = ref<string>();
  const release = () => {
    url.value && URL.revokeObjectURL(url.value);
  };
  //
  const stop = watch(
    () => resolveUnref(file),
    obj => {
      console.log(`output`,)
      release();
      if (obj) url.value = URL.createObjectURL(obj);
    }
  );

  onBeforeUnmount(() => {
    release();
    stop();
  });

  return {
    url,
  };
};
