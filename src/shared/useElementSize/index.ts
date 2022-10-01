import { ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { useMutationObserver } from '../useMutationObserver';
import { MaybeComputedRef } from '../utils';

export const useElementSize = (target: MaybeComputedRef<HTMLElement | null | undefined>) => {
  const width = ref<number>(0);
  const height = ref<number>(0);
  
  const callback = () => {
    const el = resolveUnref(target)
    if(el){
      const rect = el.getBoundingClientRect()
      width.value = rect.width
      height.value = rect.height
    }
  }

  useMutationObserver(target,() => callback());

  watch(
    () => resolveUnref(target),
    el => el && callback()
  );

  return {
    width,
    height,
  };
};
