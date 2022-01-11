<template>
  <div class="user">
    <!-- <HyForm v-bind="searchFormConfig" v-mod el="formeData" /> -->
    <search :searchFormConfig="searchFormConfig" @handleSearch='handleSearch' />
    <table-content  ref="contentref" :tableConfig="contentTableConfig" :tableName='"users"' />
  </div>
</template>

<script lang="ts">
import { defineComponent ,ref} from "vue";
// import HyForm from "@/base-ui/form/form.vue";
import Search from '@/components/page-search/page-search.vue'
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from './config/content.config'
import TableContent from '@/components/table-content/index.vue'
import {useSearch} from '@/hooks/use-page-search'
export default defineComponent({
  name: "user",
  components: {
    Search,
    TableContent
  },
  setup() {
    const {handleSearch,contentref} = useSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      handleSearch,
      contentref
    };
  },
});
</script>

<style scoped></style>
