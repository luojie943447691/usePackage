import axios from 'axios';
import { defineComponent } from 'vue';
import { useAsyncState } from '.';
import { ReponseEntity } from '../useAxios';

type Dog = {
  message: string;
  status: string;
};

export const Demo = defineComponent({
  setup() {
    const { isReady, isLoading,state,execute } = useAsyncState(
      async () => {
        const res = await axios.get('https://dog.ceo/api/breeds/image/random');
        return res.data as Dog;
      },
      {
        immediate: true,
        delay: 10,
      }
    );
    return () => (
      <>
        <button  onClick={() => execute(1000)}>发送</button>
        <div>isReady:{`${isReady.value}`}</div>
        <div>isLoading:{`${isLoading.value}`}</div>
        {state.value && <img src={state.value.message} width={500} height={500}/>}
      </>
    );
  },
});
