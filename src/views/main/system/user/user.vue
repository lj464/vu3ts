<template>
  <div class="user">
    <!-- <HyForm v-bind="searchFormConfig" v-mod el="formeData" /> -->
    <search
      :searchFormConfig="searchFormConfig"
      @handleSearch="handleSearch"
      pageName="users"
    />
    <table-content
      ref="contentref"
      :tableConfig="contentTableConfig"
      :tableName="'users'"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <ModalContent  :modalConfig="modalConfigRef" pageName='users' :defaultInfo="defaultinfo" ref="modelRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import HyForm from "@/base-ui/form/form.vue";
import Search from "@/components/page-search/page-search.vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
import TableContent from "@/components/table-content/index.vue";
import ModalContent from "@/components/modal-content/index.vue";
import { useSearch } from "@/hooks/use-page-search";
import { useModel } from "@/hooks/use-model";
import { useStore } from "vuex";
export default defineComponent({
  name: "user",
  components: {
    Search,
    TableContent,
    ModalContent,
  },
  setup() {
    const { handleSearch, contentref } = useSearch();
    const store = useStore();
    const editProvied = () => {
      let target = modalConfig.formItems.find((v) => v.field === "password");
      target.isHidden = true;
    };
    const addProvied = () => {
      let target = modalConfig.formItems.find((v) => v.field === "password");
      target.isHidden = false;
    };

    const modalConfigRef = computed(() => {
      modalConfig.formItems.forEach((v) => {
        if (v.field === "departmentId") {
          v.options = store.state.entireDepartment.map((item) => {
            return { title: item.name, value: item.id };
          });
        }
        if (v.field === "roleId") {
          v.options = store.state.entireRole.map((item) => {
            return { title: item.name, value: item.id };
          });
        }
      });
      return modalConfig
    });
    const [modelRef, handleNewData, handleEditData, defaultinfo] = useModel(
      editProvied,
      addProvied
    );
    return {
      searchFormConfig,
      contentTableConfig,
      handleSearch,
      contentref,
      modalConfigRef,
      modelRef,
      handleNewData,
      handleEditData,
      defaultinfo,
    };
  },
});
</script>

<style scoped></style>
