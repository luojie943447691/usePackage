import { debounce } from 'lodash';
import { ref, watch } from 'vue';
import { useElementBounding } from '../useElementBounding';
import { MaybeComputedRef } from '../utils';

export const useElementVisibility = (target: MaybeComputedRef<HTMLElement | null | undefined>) => {
  const visibility = ref<boolean>(false);
  const innerWidth = ref<number>(window.innerWidth);
  const innerHeight = ref<number>(window.innerHeight);
  const { bottom, top, left, right } = useElementBounding(target);
  watch([bottom, top, left, right, innerWidth, innerHeight], ([bottom, top, left, right, innerWidth, innerHeight]) => {
    // 对于 y 轴 -> 大于视窗或者下边界小于0 都不在视窗之内
    // 对于 x 轴 -> right < 0 或者 left > innerWidth
    if (bottom <= 0 || top > innerHeight || right <= 0 || left > innerWidth) {
      visibility.value = false;
    } else {
      visibility.value = true;
    }
  });

  const db = debounce(() => {
    innerWidth.value = window.innerWidth;
    innerHeight.value = window.innerHeight;
  }, 100);

  window.addEventListener('resize', db);

  return {
    visibility,
  };
};
