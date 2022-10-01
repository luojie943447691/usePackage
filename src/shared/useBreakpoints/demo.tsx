import { defineComponent } from "vue";
import { useBreakpoints } from ".";

export const Demo = defineComponent({
  setup(){
    const responsive = useBreakpoints()
    return () => <div>
      sm:{`${responsive.sm}`};<br />
      md:{`${responsive.md}`};<br />
      lg:{`${responsive.lg}`};<br />
      xl:{`${responsive.xl}`};<br />
      xxl:{`${responsive.xxl}`};<br />
      xxxl:{`${responsive.xxxl}`};

    </div>
  }
})