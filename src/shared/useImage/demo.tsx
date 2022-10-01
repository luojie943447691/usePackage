import axios from 'axios';
import { defineComponent } from 'vue';
import { useImage } from '.';
import { ReponseEntity } from '../useAxios';

type Dog = {
  message: string;
  status: string;
};

export const Demo = defineComponent({
  setup() {
    const {  isLoading,state } = useImage(
      "https://place.dog/300/200",
      {
        immediate: true,
        delay: 10,
      }
    );
    return () => (
      <>
        {
          isLoading.value ? (<div>加载中...</div>) : (<img src="https://place.dog/300/200"/>)
        }
      </>
    );
  },
});
