import { ref, Ref } from "vue";

export type booleanFn = () => boolean;
export function useSupport(fn: booleanFn) {
  const res = ref<boolean>(fn())
  return res
}
