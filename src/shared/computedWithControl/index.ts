import {
  computed,
  ComputedGetter,
  ComputedRef,
  customRef,
  watch,
  WatchSource,
} from "vue";

export const computedWithControl = <T, S>(
  source: WatchSource<S> | WatchSource<S>[],
  fn: ComputedGetter<T>
): ComputedRef<T> => {
  let value: T = undefined!;
  let dirty = true;
  const update = () => {
    dirty = true;
  };
  watch(source, update, { flush: "sync" });

  let res = customRef<T>(() => {
    return {
      get() {
        if (dirty) {
          dirty = false;
          value = fn();
        }
        return value;
      },
      set() {},
    };
  }) as ComputedRef<T>;

  return res;
};
