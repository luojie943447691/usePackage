import { debounce, DebounceSettings, DebounceSettingsLeading } from "lodash";
import { ref, Ref, watch } from "vue";

// export function useDebounceData<
//   F extends () => any,
//   K extends keyof ReturnType<F>
// >(
//   f: F,
//   k: K,
//   wait: number,
//   refData: Ref<ReturnType<F>>,
//   options?: DebounceSettingsLeading
// ): Ref<ReturnType<F>[K]>;
// export function useDebounceData<
//   F extends () => any,
//   K extends keyof ReturnType<F>
// >(
//   f: F,
//   k: K,
//   wait: number,
//   refData: Ref<ReturnType<F>>,
//   options?: DebounceSettings
// ): Ref<ReturnType<F>[K]>;
// export function useDebounceData<
//   F extends () => any,
//   K extends keyof ReturnType<F>
// >(
//   f: F,
//   k: K,
//   wait: number = 1000,
//   refData: Ref<ReturnType<F>>,
//   options?: DebounceSettingsLeading | DebounceSettings
// ): Ref<ReturnType<F>[K]> {
//   const data = f();

//   const newData = ref(data[k]) as Ref<ReturnType<typeof f>[typeof k]>;

//   const t = debounce(
//     (newValue) => {
//       refData.value[k] = newValue;
//     },
//     1000,
//     options
//   );

//   watch(newData, (newValue) => {
//     t(newValue);
//   });

//   return newData;
// }

type fn = () => void;

export function useDebounceData<F extends Ref, K extends keyof F["value"]>(
  refData: F,
  k: K,
  fn?:fn,
  wait?: number,
  options?: DebounceSettingsLeading
): Ref<F[K]>;
export function useDebounceData<F extends Ref, K extends keyof F["value"]>(
  refData: F,
  k: K,
  fn?:fn,
  wait?: number,
  options?: DebounceSettings
): Ref<F[K]>;
export function useDebounceData<F extends Ref, K extends keyof F["value"]>(
  refData: F,
  k: K,
  fn:fn = () => {},
  wait: number = 1000,
  options?: DebounceSettingsLeading | DebounceSettings
): Ref<F[K]> {
  const data = refData.value;

  const newData = ref(data[k]) as Ref<F[K]>;

  const t = debounce(
    (newValue) => {
      fn?.()
      refData.value[k] = newValue;
    },
    wait,
    options
  );

  watch(newData, (newValue) => {
    t(newValue);
  });

  return newData;
}
