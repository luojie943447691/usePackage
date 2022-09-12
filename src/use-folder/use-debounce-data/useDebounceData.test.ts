import { delay } from "../../shared/utils";
import { ref } from "vue";
import { useDebounceData } from "./src/useDebounceData";

describe("useDebounceData happy path", () => {
  it("useDebounceData ", async () => {
    const dataRef = ref<{ a: string }>({
      a: "lj",
    });
    const callback = jest.fn(() => {});
    const resultRef = useDebounceData(dataRef, "a", callback,100);
    resultRef.value = "1";
    await delay(150);
    resultRef.value = "2";
    await delay(150);
    resultRef.value = "3";
    await delay(150);
    // console.log("456----------------");
    expect(callback).toHaveBeenCalledTimes(3);
    expect(dataRef.value.a).toBe("3");
  });
});
