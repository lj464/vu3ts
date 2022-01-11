<template>
  <div class="user">
    <table-content
      :tableConfig="contentTableConfig"
      :tableName="'menu'"
    >
    </table-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
import TableContent from "@/components/table-content/index.vue";
export default defineComponent({
  name: "user",
  components: {
    TableContent,
  },
  setup() {
    return {
      contentTableConfig,
    };
  },
});
</script>

<style scoped></style>
