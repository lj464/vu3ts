<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <div class="page-info">
          <el-config-provider :locale="locale">
            <router-view />
          </el-config-provider>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "@/components/nav-menu/indx.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import NavHeader from "@/components/nav-header/index.vue";
export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    ElConfigProvider,
  },
  setup() {
    let isCollapse = ref(false);
    const handleFoldChange = () => {
      isCollapse.value = !isCollapse.value;
    };
    return {
      handleFoldChange,
      isCollapse,
      locale: zhCn,
    };
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.page-info {
  background-color: #fff;
  border-radius: 5px;
}
</style>
