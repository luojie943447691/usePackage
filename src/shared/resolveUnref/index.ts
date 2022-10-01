import { unref } from 'vue';
import { MaybeComputedRef } from '../utils';

export function resolveUnref<T>(r: MaybeComputedRef<T>):T {
  return typeof r === 'function' ? (r as any)() : unref(r);
}
