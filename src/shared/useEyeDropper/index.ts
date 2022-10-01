import { ref } from 'vue';
import { useClipboard } from '../useClipboard';
import { useEventListener } from '../useEventListener';
import { MaybeComputedRef } from '../utils';

export interface EyeDropper {
  new (): EyeDropper;
  open: (options?: EyeDropperOptions) => Promise<{ sRGBHex: string }>;
  [Symbol.toStringTag]: 'EyeDropper';
}

export interface EyeDropperOptions {
  signal?: AbortSignal;
}

export const useEyeDropper = (
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  options?: EyeDropperOptions
) => {
  const isSupported = window && 'EyeDropper' in window;
  const eyeDropper: EyeDropper = new (window as any).EyeDropper();
  const sRGBHex = ref<string>();
  const {excute} = useClipboard()
  useEventListener(target, 'click', async function () {
    if (isSupported) {
      const res = await open();
      sRGBHex.value = res;
      // 复制到粘贴板
      excute(res)
    }
  });
  const open = async () => {
    const { sRGBHex } = await eyeDropper.open(options);
    return sRGBHex;
  };

  return {
    isSupported,
    open,
    sRGBHex,
  };
};
