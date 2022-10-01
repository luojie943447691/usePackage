import { reactive, ref } from 'vue';
import { useMediaQuery } from '../useMediaQuery';

export enum Size {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
}

export type SizePix = Record<Size, number>;

export type useBreakpointsReturn = Record<Size, boolean>;

export const sizePix: SizePix = {
  sm: 640,
  md: 786,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
  xxxl: 1920,
};
export const useBreakpoints = () => {
  const result = reactive<useBreakpointsReturn>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
    xxxl: false,
  });

  const update = () => {
    Object.keys(sizePix).forEach(key => {
      const mediaQuery = useMediaQuery(`(max-width:${sizePix[key as Size]}px)`);
      result[key as Size] = mediaQuery.matches;
      mediaQuery.addEventListener('change', update);
    });
  };

  update();
  return result;
};
