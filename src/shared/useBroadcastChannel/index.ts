import { onMounted, ref } from 'vue';
import { resolveUnref } from '../resolveUnref';
import { Fn, MaybeComputedRef } from '../utils';

export const useBroadcastChannel = (channelName: string) => {
  const isClosed = ref<boolean>(true);
  const data = ref<string>();
  const channel = new BroadcastChannel(channelName);
  const post = (message: MaybeComputedRef<string | undefined>) => {
    const msg = resolveUnref(message);
    if (msg) {
      isClosed.value = false;
      channel.postMessage(msg);
    }
  };

  const close = () => {
    if (channel) {
      isClosed.value = true;
      data.value = '';
      channel.close();
    }
  };

  onMounted(() => {
    channel.addEventListener('message', e => {
      if (channel) {
        data.value = e.data;
      }
    });
  });

  return {
    channel,
    isClosed,
    post,
    close,
    data,
  };
};
