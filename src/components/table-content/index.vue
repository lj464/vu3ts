<template>
  <div>
    <tablecontet :listData="targetTable" :propList="tableConfig.propList">
      <template #status="data">
        {{ data.colum == 1 ? "在线" : "离线" }}
      </template>
      <template #createAt="data">
        {{ $formatTime(data.colum) }}
      </template>
      <template #updateAt="data">
        {{ $formatTime(data.colum) }}
      </template>
      <template #handler>
        <el-button type="primary" :icon="Edit">编辑</el-button>
        <el-button type="danger" :icon="Delete">删除</el-button>
      </template>
    </tablecontet>
  </div>
</template>

<script lang='ts'>
import { Edit, Delete } from "@element-plus/icons-vue";
import tablecontet from "@/base-ui/table/table.vue";
import { useStore  } from "vuex";
import {computed} from 'vue'
export default {
  name: "content",
  props: {
    tableConfig: {
      type: Object,
      required: true,
    },
    tableName:{
      type:String,
      required:true
    }
  },
  components: {
    tablecontet,
    Edit,
    Delete,
  },
  setup(props) {
    const store = useStore()
    let targetName =props.tableName.slice(0, 1).toUpperCase() + props.tableName.slice(1)
    store.dispatch(`system/getListAction`, {
      queryInfo: {
        offset: 0,
        size: 10,
      },
      targetName
    });
    const targetTable = computed(
      () => store.getters[`system/pageListData`](props.tableName)
    );
    return {
      targetTable
    }
  },
};
</script>

<style></style>
