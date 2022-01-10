<template>
  <div class="hy-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="(propItem,index) in propList" :key="index">
        <el-table-column v-bind="propItem" align="center">
          <template #default='scope' >
            <slot :name='propItem.slotName' :colum='scope.row[propItem.prop]' >
              {{scope.row[propItem.prop]}}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'baseTable',
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
