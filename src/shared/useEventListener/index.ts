import { onBeforeUnmount, Ref, watch } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { Fn, isString, MaybeComputedRef, noop } from '../utils';

export function useEventListener<K extends keyof DocumentEventMap>(
  target: MaybeComputedRef<Document | null | undefined>,
  event: K,
  listener: (this: Document, ev?: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: MaybeComputedRef<HTMLElement | null| undefined>,
  event: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<EventType = Event>(
  target: MaybeComputedRef<EventTarget | null | undefined>,
  event: string,
  listener:  (ev?: EventTarget) => any,
  options?: boolean | AddEventListenerOptions
): Fn
export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener(...args: any[]): Fn {
  let target: EventTarget | undefined; // EventTarget 是所有事件的公共对象
  let event: string;
  let listener: any;
  let options: any;

  let cleanup = noop;
  if (isString(args[0])) {
    target = window;
    [event, listener, options] = args;
  } else {
    [target, event, listener, options] = args;
  }

  if (!target) return cleanup;

  const stopWatch = watch(
    () => resolveUnref(target),
    target => {
      cleanup();
      if (!target) return;
      
      target.addEventListener(event, listener, options);
      cleanup = () => {
        target.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    }
  );

  const stop = () => {
    stopWatch();
    cleanup();
  };

  onBeforeUnmount(() => {
    stop();
  });

  return stop;
}
