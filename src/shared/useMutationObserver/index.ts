import { onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { Fn, MaybeComputedRef } from '../utils';

export const useMutationObserver = (target: MaybeComputedRef<HTMLElement | null | undefined>, fn?: Fn) => {
  let observer: MutationObserver | null = null;
  const config: MutationObserverInit = {
    attributes: true,
  };

  const cleanup = () => {
    if (observer) {
      observer?.disconnect();
      observer = null;
    }
  };

  const stopWatch = watch(
    () => resolveUnref(target),
    el => {
      if (el) {
        cleanup();
        observer = new MutationObserver(fn!);
        observer.observe(el, config);
      }
    }
  );

  onBeforeUnmount(() => {
    cleanup();
    stopWatch();
  });
};
