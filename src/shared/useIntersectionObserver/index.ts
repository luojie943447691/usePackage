import { onBeforeUnmount, ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { Fn, MaybeComputedRef, noop } from '../utils';

export type useIntersectionObserverOptions = {
  root?: MaybeComputedRef<HTMLElement | null | undefined>;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIntersectionObserver = (
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  callback: Fn = noop,
  options: useIntersectionObserverOptions = {}
) => {
  const { root, rootMargin = '0px', threshold = 0.05 } = options;

  const visibility = ref<boolean>(false);
  const isSupported = window && 'IntersectionObserver' in window;

  let cleanup = noop;

  const intersection = () => {
    const el = resolveUnref(target);
    if (!el) return;
    if (!isSupported) return;
    function _callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach(({isIntersecting}) => {
        if(isIntersecting){
          visibility.value = true
        }
        else{
          visibility.value = false
        }
      });
    }
    const observer = new IntersectionObserver(_callback, {
      root:resolveUnref(root),
      rootMargin,
      threshold
    });
    observer.observe(el);

    cleanup = () => {
      observer.disconnect();
      visibility.value = false;
    };
  };
  const stopWatch = watch(
    () => ({
      el: resolveUnref(target),
      root: resolveUnref(root),
    }),
    ({ el, root }) => {
      if (el) {
        cleanup();
        intersection();
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    stopWatch();
    cleanup();
  });

  return {
    visibility,
  };
};
