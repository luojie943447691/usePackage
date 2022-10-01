import { ComputedRef, Ref } from 'vue';

export type Fn = () => void;

export interface Position {
  x: number;
  y: number;
}

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

export type MaybeRef<T> = T | Ref<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>

export type MaybeElement = HTMLElement | null | undefined

export type PointerType = 'mouse' | 'touch' | 'pen'