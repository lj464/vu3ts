<template>
  <div class="user">
    <!-- <HyForm v-bind="searchFormConfig" v-model="formeData" /> -->
    <search :searchFormConfig="searchFormConfig" />
    <table-content  :tableConfig="contentTableConfig" :tableName='"role"' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from '@/components/page-search/page-search.vue'
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from './config/content.config'
import TableContent from '@/components/table-content/index.vue'
export default defineComponent({
  name: "user",
  components: {
    Search,
    TableContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    };
  },
});
</script>

<style scoped></style>
