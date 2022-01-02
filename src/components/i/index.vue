<template>
  <el-icon @click="handleClick" :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
</template>

<script>
import { ref, defineComponent } from "vue";
import * as Icons from "@element-plus/icons";

export default defineComponent({
  emits: ["click"],
  components: Icons,
  name: "ElIcons",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };
    return {
      handleClick,
    };
  },
});
</script>
