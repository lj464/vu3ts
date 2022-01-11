<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <!-- <template #header>
        <h1 class="header">高级检索</h1>
      </template> -->
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="resetData">重置</el-button>
          <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import HyForm from "@/base-ui/form/form.vue";

export default defineComponent({
  name: "zli",
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true,
    },
  },
  components: {
    HyForm,
  },
  emits: ["handleSearch"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    let formData = ref(formOriginData);
    props.searchFormConfig.formItems.forEach((item) => {
      formData.value[item.field] = "";
    });

    const resetData = () => {
      props.searchFormConfig.formItems.forEach((item) => {
        formData.value[item.field] = "";
      });
      emit("handleSearch", formData.value);
    };
    const search = () => {
      emit("handleSearch", formData.value);
    };
    return {
      formData,
      resetData,
      search,
    };
  },
});
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
