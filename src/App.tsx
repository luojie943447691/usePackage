import { defineComponent, ref, watch } from 'vue';
import { Demo } from './shared/useObjectUrl/demo';
// import { Demo } from './shared/useElementBounding/demo';

export default defineComponent({
  setup() {
    return () => <Demo></Demo>;
  },
});
