import { resolveUnref } from '@/shared/resolveUnref';
import { MaybeElement, MaybeElementRef } from '@/shared/utils';
import { onBeforeUnmount, watch } from 'vue';

export function onClickOutside(target: MaybeElementRef, callback: () => void) {
  const listener = (e: Event) => {
    e.composedPath();
  };
  const bindEvent = () => {
    const el = resolveUnref(target)
    if (el) {
      window.addEventListener('click', listener, { passive: true });
    }
  };
  const removeEvent = () => {
    const el = resolveUnref(target)
    if (el) {
      window.removeEventListener('click', listener);
    }
  };
  const stop = watch(
    () => resolveUnref(target),
    el => {
      bindEvent();
    }
  );

  onBeforeUnmount(() => {
    stop();
    removeEvent();
  });
}
