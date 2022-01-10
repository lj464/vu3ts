<template>
  <div class="nav-header">
    <LJi
      @click="handleFoldClick"
      class="icon"
      :name="isFold ? 'ArrowRightBold' : 'ArrowLeft'"
    />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in arrPath" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { getMenuId } from "@/utils/map-menus";
import { useRoute } from "vue-router";
import userMenuObj from "@/store/types";
import { useStore } from "vuex";
export default defineComponent({
  // 折叠事件
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    // 面包屑
    let arrPath = computed(() => {
      const store = useStore();
      const route = useRoute();
      const userMenus = computed<userMenuObj[]>(() => store.state.userMenus);
      let { target, parent } = getMenuId(userMenus.value, route.path);
      return [parent.name,target.name]
    });
    console.log(parent, "8888888888");
    return {
      isFold,
      handleFoldClick,
      arrPath,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  .icon {
    margin-right: 10px;
  }
}
</style>
