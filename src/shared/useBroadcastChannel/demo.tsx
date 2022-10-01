import { defineComponent, ref, watch } from "vue";
import { useBroadcastChannel } from ".";

export const Demo = defineComponent({
  setup(){
    const {channel,data,post,close,isClosed} = useBroadcastChannel("rojer")
    watch(data,(dt) => {
      if(dt){
        alert(dt)
      }
    })
    const inputValue = ref<string>()
    return () => <>
      <input v-model={inputValue.value}></input>
      {`close:${isClosed.value}`}
      <button onClick={() =>{
        post(inputValue.value)
      }}>发送</button>
    </>
  }
})