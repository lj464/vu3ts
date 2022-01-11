<template>
  <div>
    <tablecontet
      :listData="targetTable"
      v-bind="tableConfig"
      v-model:pagenation="pagenation"
      :listCount="targetCount"
    >
      <template #headerHandler>
        <h2 style="padding-left: 30px">{{ tableConfig.title }}</h2>
        <el-button v-show="tableConfig.isCreate && isCreate" type="primary" style="margin-left: 30px; float: left" size="medium"
          >{{'新增'+tableConfig.title.replace('列表','')}}</el-button
        >
      </template>
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
        <el-button type="primary" :icon="Edit" v-if="isUpdate">编辑</el-button>
        <el-button type="danger" :icon="Delete" v-if="isDelete">删除</el-button>
      </template>
      <template #[item]="scoped" v-for="(item, index) in privateSloat" :key="index">
        <slot :name="item" :colum="scoped.colum"> </slot>
      </template>
    </tablecontet>
  </div>
</template>

<script lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import tablecontet from "@/base-ui/table/table.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { usePremission } from "@/hooks/use-premission";
export default {
  name: "content",
  props: {
    tableConfig: {
      type: Object,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    },
  },
  components: {
    tablecontet,
    Edit,
    Delete,
  },
  setup(props) {
    const store = useStore();
    const targetName =
      props.tableName.slice(0, 1).toUpperCase() + props.tableName.slice(1);
    // 获取表格数据
    const targetTable = computed(() =>
      store.getters[`system/pageListData`](props.tableName)
    );
    // 获取分页总数
    const targetCount = computed(() =>
      store.getters[`system/listCount`](props.tableName)
    );
    const pagenation = ref({ currentPage: 1, pageSize: 10 });

    // 按钮权限
    const isUpdate = usePremission(props.tableName, "update");
    const isDelete = usePremission(props.tableName, "delete");
    const isQuery = usePremission(props.tableName, "query");
    const isCreate = usePremission(props.tableName, "create");

    const getBaseData = (search: any = {}) => {
      store.dispatch(`system/getListAction`, {
        queryInfo: {
          offset: (pagenation.value.currentPage - 1) * pagenation.value.pageSize,
          size: pagenation.value.pageSize,
          ...search,
        },
        targetName,
      });
    };
    getBaseData();
    // 注册分页信息
    watch(pagenation, () => {
      getBaseData();
    });
    //设置公共表格插槽名称
    const pubTableSlot = ["status", "createAt", "updateAt", "handler"];
    const privateSloat = [];
    props.tableConfig.propList.forEach((v) => {
      if (v.slotName && !pubTableSlot.includes(v.slotName)) {
        privateSloat.push(v.slotName);
      }
    });
    return {
      targetTable,
      getBaseData,
      pagenation,
      targetCount,
      privateSloat,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
    };
  },
};
</script>

<style></style>
