import { resolveUnref } from '../resolveUnref';
import { MaybeComputedRef } from '../utils';

export const useClipboard = () => {
  const excute = async (content: MaybeComputedRef<string | undefined | null>) => {
    const copyContent = resolveUnref(content)
    if(!copyContent) return;
    await navigator.clipboard.writeText(copyContent);
    console.log(`复制成功`);
  };

  return {
    excute
  }
};
