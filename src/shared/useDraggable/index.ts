import { nextTick, watch } from 'vue';
import { computed, onMounted, Ref, ref, toRefs } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { MaybeComputedRef, PointerType, Position } from '../utils';

export interface useDraggableOptions {
  // 拖动的元素
  dragElement?: MaybeComputedRef<HTMLElement | undefined | null>;
  // 被拖动的元素
  dragHandle?: MaybeComputedRef<HTMLElement | undefined | null>;
  // 点击的类型
  pointerType?: PointerType[];

  // 初始位置
  position?: MaybeComputedRef<Position>;

  // 是否取消默认事件
  preventDefault?: MaybeComputedRef<boolean>;

  // 是否阻止事件冒泡
  stopPropagation?: MaybeComputedRef<boolean>;

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false;

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void;

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void;
}

export function useDraggable(
  target: MaybeComputedRef<HTMLElement | undefined | null>,
  options: useDraggableOptions = {}
) {
  const draggingElement = options.dragElement ?? window;
  const draggingHandle = options.dragHandle ?? target;
  const position = ref<Position>(resolveUnref(options.position) ?? { x: 0, y: 0 });
  const pressedDelta = ref<Position>();

  const handlePointerType = (e: PointerEvent) => {
    if (options.pointerType) {
      return options.pointerType.includes(e.pointerType as PointerType);
    }
    return true;
  };

  const handleEvent = (e: PointerEvent) => {
    if (options.preventDefault) e.preventDefault();
    if (options.stopPropagation) e.stopPropagation();
  };

  const start = (e: PointerEvent) => {
    // 不包含指定 事件
    if (!handlePointerType(e)) return;
    if (e.target !== resolveUnref(target)) return;

    const rect = resolveUnref(target)!.getBoundingClientRect();
    const pos = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    };
    if (options.onStart?.(pos, e) === false) return;
    pressedDelta.value = pos;
    handleEvent(e);
  };

  const move = (e: PointerEvent) => {
    // 不包含指定 事件
    if (!handlePointerType(e)) return;
    if (!pressedDelta.value) return;
    position.value = {
      x: e.pageX - pressedDelta.value.x,
      y: e.pageY - pressedDelta.value.y,
    };
    // console.log(computed(() => `left:"${position.value.x}px";top:"${position.value.y}px"`).value);
    options.onMove?.(position.value, e);
    handleEvent(e);
  };

  const end = (e: PointerEvent) => {
    // 不包含指定 事件
    if (!handlePointerType(e)) return;
    if (!pressedDelta.value) return;
    pressedDelta.value = undefined;
    options.onEnd?.(position.value, e);
    handleEvent(e);
  };

  watch(
    () => resolveUnref(draggingHandle),
    el => {
      if (el) {
        const element = resolveUnref(draggingElement);
        (el as HTMLElement).addEventListener('pointerdown', start);
        (element as HTMLElement).addEventListener('pointermove', move);
        (element as HTMLElement).addEventListener('pointerup', end);
      }
    }
  );

  return {
    position,
    isDragging: computed(() => !pressedDelta.value),
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px`),
  };
}
