import { ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { tryOnMounted } from '../tryOnMounted';
import { useMutationObserver } from '../useMutationObserver';
import { MaybeComputedRef } from '../utils';

export const useElementBounding = (target: MaybeComputedRef<HTMLElement | null | undefined>) => {
  const height = ref<number>(0);
  const bottom = ref<number>(0);
  const left = ref<number>(0);
  const right = ref<number>(0);
  const top = ref<number>(0);
  const width = ref<number>(0);
  const x = ref<number>(0);
  const y = ref<number>(0);

  function update() {
    const el = resolveUnref(target);
    if (el) {
      const rect = el.getBoundingClientRect();
      height.value = rect.height;
      bottom.value = rect.bottom;
      console.log(" bottom.value", bottom.value)
      left.value = rect.left;
      right.value = rect.right;
      top.value = rect.top;
      width.value = rect.width;
      x.value = rect.x;
      y.value = rect.y;
    }
  }

  useMutationObserver(target, () => update());

  watch(
    () => resolveUnref(target),
    el => el && update()
  );

  // 监听scroll 变化
  watch(
    () => resolveUnref(target),
    el => {
      if (el) {
        window.addEventListener('scroll', () => update());
        window.addEventListener('resize', () => {
          update();
        });
        tryOnMounted(() => {
          update();
        });
      }
    },
    { immediate: true }
  );

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
  };
};
export type useElementBoundingReturnType = ReturnType<typeof useElementBounding>;
