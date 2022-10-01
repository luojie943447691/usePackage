import { computed, ComputedGetter, ComputedRef, customRef, watch, WatchSource, WritableComputedOptions, WritableComputedRef } from 'vue';
import { isFunction } from '../utils';

export function computedWithControl<T, S>(
  source: WatchSource<S> | WatchSource<S>[],
  fn: ComputedGetter<T>
): ComputedRef<T>;

export function computedWithControl<T, S>(
  source: WatchSource<S> | WatchSource<S>[],
  fn: WritableComputedOptions<T>
): WritableComputedRef<T>;

export function computedWithControl<T, S>(
  source: WatchSource<S> | WatchSource<S>[],
  fn: ComputedGetter<T> | WritableComputedOptions<T>
): ComputedRef<T> | WritableComputedRef<T>{
  let value: T = undefined!;
  let dirty = true;
  const update = () => {
    dirty = true;
  };

  const get = isFunction(fn) ? fn : fn.get;
  const set = isFunction(fn) ? undefined : fn.set;

  watch(source, update, { flush: 'sync' });

  let res = customRef<T>((_track, _trigger) => {
    console.log("_track",_track)
    return {
      get() {
        if (dirty) {
          dirty = false;
          value = get();
        }
        return value;
      },
      set(v) {
        set?.(v);
      },
    };
  }) as ComputedRef<T>;

  return res;
}
