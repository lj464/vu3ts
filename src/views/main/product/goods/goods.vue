<template>
  <div class="user">
    <table-content
      ref="contentref"
      :tableConfig="contentTableConfig"
      :tableName="'goods'"
    >
      <template #image="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row]"
        >
        </el-image>
      </template>
      <template #oldPrice="{ row }">
        <div>{{'$'+ row.oldPrice}}</div>
      </template>
    </table-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HyForm from "@/base-ui/form/form.vue";
import { contentTableConfig } from "./config/content.config";
import TableContent from "@/components/table-content/index.vue";
import { useSearch } from "@/hooks/use-page-search";
export default defineComponent({
  name: "user",
  components: {
    TableContent,
  },
  setup() {
    const { handleSearch, contentref } = useSearch();
    return {
      contentTableConfig,
      handleSearch,
      contentref,
    };
  },
});
</script>

<style scoped></style>
