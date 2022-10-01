import { nextTick } from 'vue';
import { getCurrentInstance, onMounted } from 'vue';
import { Fn } from '../utils';

export const tryOnMounted = (fn: Fn) => {
  if (getCurrentInstance()) {
    onMounted(() => {
      fn();
    });
  } else {
    nextTick(() => {
      fn();
    });
  }
};
