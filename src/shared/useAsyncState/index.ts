import { isFunction } from 'lodash';
import { ref, Ref, UnwrapRef } from 'vue';
import { delay as delayFn } from '../utils';

export interface UseAsyncStateReturn<Data, Shallow extends boolean> {
  state: Ref<Data>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<unknown>;
  execute: (delay?: number, ...args: any[]) => Promise<Data>;
}

export type useAsyncStateOption<T = never> = {
  /**
   * Delay for excuting the promise.In millseconds
   *
   * @default 0
   */
  delay?: number;

  /**
   * Execute the promise right after the function is invoked.
   * Will apply the delay if any.
   *
   * When set to false, you will need to execute it manually.
   *
   * @default true
   */
  immediate?: boolean;

  /**
   * Sets the state to initialState before executing the promise.
   *
   * This can be useful when calling the execute function more than once (for
   * example, to refresh data). When set to false, the current state remains
   * unchanged until the promise resolves.
   *
   * @default true
   */
  resetOnExecute?: boolean;

  initState?: T;
};

export function useAsyncState<Data>(
  promise: Promise<Data> | ((...args: any[]) => Promise<Data>),
  options?: useAsyncStateOption<Data>
): UseAsyncStateReturn<Data, false> {
  const { delay = 0, immediate = false, resetOnExecute = true, initState } = options ?? {};
  const state = ref(initState) as Ref<Data>;

  const isReady = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const error = ref();

  const execute = async (delay = 0, ...args: any[]): Promise<Data> => {
    if (resetOnExecute) {
      error.value = undefined;
    }

    state.value = initState!;
    isReady.value = false;
    isLoading.value = true;

    const _promise = isFunction(promise) ? promise(...args) : promise;
    console.log("start-------",Date.now())
    // 延迟执行
    if (delay > 0) await delayFn(delay);
    console.log("end-------",Date.now())
    try {
      const data = await _promise;
      console.log("data-----------------",data)
      state.value = data;
      isReady.value = true;
    } catch (err) {
      error.value = err;
      console.log(`11`,)
    } finally {
      isLoading.value = false;
    }

    return state.value;
  };

  if (immediate) execute(delay);
  return {
    state,
    isReady,
    isLoading,
    error,
    execute,
  };
}
