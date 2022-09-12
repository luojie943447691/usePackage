import { defineComponent, ref, watch } from "vue";
import { useDebounceData } from "./use-folder/use-debounce-data";

export default defineComponent({
  setup() {
    const dataRef = ref({
      a: 10,
    });

    const d = useDebounceData(dataRef,"a");

    // const t = ref(123);
    const t = ref("123");

    watch(
      () => dataRef.value.a,
      (newValue) => {
        console.log("变化了", newValue);
      }
    );
    return () => (
      <>
        {/* <input type="number" value={t.value} /> */}
        <button
          onClick={() => {
            t.value += 1;
          }}
        >+1</button>
        <input type="text" v-model={d.value} />
      </>
    );
  },
});
