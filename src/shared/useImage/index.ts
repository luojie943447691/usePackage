import { useAsyncState, useAsyncStateOption } from '../useAsyncState';

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
  });
}

export const useImage = (url: string, options: useAsyncStateOption) => {
  const {isLoading,state} = useAsyncState<HTMLImageElement>(async () => {
    const img = await loadImage(url);
    
    return img
  }, options);
  return {
    isLoading,
    state
  }
};
