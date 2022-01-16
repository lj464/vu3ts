<template>
  <div class="user">
    <!-- <HyForm v-bind="searchFormConfig" v-model="formeData" /> -->
    <search :searchFormConfig="searchFormConfig" />
    <table-content
      :tableConfig="contentTableConfig"
      :tableName="'role'"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <ModalContent
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultinfo"
      ref="modelRef"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          ref="elTreeRef"
          show-checkbox
          node-key="id"
          @check="handleCheckChange"
          :props="defaultProps"
        />
      </div>
    </ModalContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Search from "@/components/page-search/page-search.vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import TableContent from "@/components/table-content/index.vue";
import ModalContent from "@/components/modal-content/index.vue";
import { modalConfig } from "./config/modal.config";
import { useModel } from "@/hooks/use-model";
import { useStore } from "vuex";
import { menuMapLeafKeys } from "@/utils/map-menus";
export default defineComponent({
  name: "role",
  components: {
    Search,
    TableContent,
    ModalContent,
  },
  setup() {
    // 1.处理pageModal的hook
    const elTreeRef = ref();
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList);
      setTimeout(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      }, 0);
    };
    const defaultProps = {
      children: "children",
      label: "name",
    };
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const [modelRef, handleNewData, handleEditData, defaultinfo] = useModel(editCallback);
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      modelRef,
      handleNewData,
      handleEditData,
      defaultinfo,
      defaultProps,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef,
    };
  },
});
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
