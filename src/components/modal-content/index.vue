<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      destroy-on-close
      width="30%"
      center
    >
      <LJform v-bind="modalConfig" v-model="modelData" />
      <slot> </slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleOk">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import LJform from "@/base-ui/form/form.vue";
export default {
  name: "modelcontet",
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
    otherInfo: {
      // 插槽中的自定义数据
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    LJform,
  },
  setup(props) {
    let centerDialogVisible = ref(false);
    let modelData = ref({});
    const store = useStore();
    const handleOk = () => {
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        let data = {
          pageName: props.pageName,
          newData: {...modelData.value,...props.otherInfo},
          id: props.defaultInfo.id,
        };
        store.dispatch("system/editPageDataAction", data);
      } else {
        let data = {
          pageName: props.pageName,
          newData: {...modelData.value,...props.otherInfo},
        };
        store.dispatch("system/createPageDataAction", data);
      }
      centerDialogVisible.value = false;
    };
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          modelData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    return {
      centerDialogVisible,
      modelData,
      handleOk,
    };
  },
};
</script>

<style></style>
