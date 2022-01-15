<template>
  <div class="hy-table">
    <slot name="headerHandler"></slot>
    <el-table :data="listData" v-bind="childrenProps" border style="width: 100%">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="(propItem, index) in propList" :key="index">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenation.currentPage"
        :page-size="pagenation.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "baseTable",
  props: {
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    listCount: {
      type: Number,
      default: 10,
    },
    pagenation: {
      type: Object,
      default: () => {
        return {
          currentPage: 0,
          pageSize: 10,
        };
      },
    },
    listData: {
      type: Array,
      required: true,
    },
    propList: {
      type: Array,
      required: true,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:pagenation"],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize) => {
      emit("update:pagenation", { ...props.pagenation, pageSize });
    };
    const handleCurrentChange = (currentPage) => {
      emit("update:pagenation", { ...props.pagenation, currentPage });
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="less">
.footer {
  margin-top: 15px;
  text-align: right;
}
</style>
