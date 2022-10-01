import { Ref, ref, toRefs, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { MaybeComputedRef } from '../utils';

export type useDropZoneReturn = {
  isOverDropZone: Ref<boolean>;
};

export const useDropZone = (
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  onDrop?: (files: File[] | null) => void
): useDropZoneReturn => {
  const isOverDropZone = ref<boolean>(false);
  // 用于判断 isOverDropZone: 原因是 dragenter dragleave 会一直触发。
  const counter = ref<number>(0)

  watch(
    () => resolveUnref(target),
    el => {
      if (el) {
        // 添加事件监听
        el.addEventListener('dragover', e => {
          e.preventDefault();
        });

        el.addEventListener('dragenter', e => {
          e.preventDefault();
          counter.value += 1
          // console.log(`dragenter`)
          isOverDropZone.value = true;
        });

        el.addEventListener('dragleave', e => {
          e.preventDefault();
          // console.log(`dragleave`)
          counter.value -= 1
          if(counter.value === 0){
            isOverDropZone.value = false;
          }
        });

        el.addEventListener('drop', e => {
          e.preventDefault();
          isOverDropZone.value = false;
          counter.value  = 0
          const files = Array.from(e.dataTransfer?.files ?? []);
          onDrop?.(files.length === 0 ? null : files)
        });
      }
    }
  );

  return {
    isOverDropZone,
  };
};
