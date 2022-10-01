import { defineComponent, ref } from "vue";
import { useEventListener } from ".";

export const Demo = defineComponent({
  setup(){
    const rootRef = ref<HTMLElement | null>(null)

    const stop = useEventListener(rootRef,'click',function(){
      console.log("我被点击了");
    })
    return () => <div id="a" ref={rootRef}>
      123456789
    </div>
  }
})