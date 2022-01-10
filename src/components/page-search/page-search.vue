<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="resetData">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
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
  setup(props) {
    let formData = reactive({});
    props.searchFormConfig.formItems.forEach((item) => {
      formData[item.field] = "";
    });

    const resetData = () => {
      formData = props.searchFormConfig.formItems.forEach((item) => {
        formData[item.field] = "";
      });
    };
    return {
      formData,
      resetData,
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
