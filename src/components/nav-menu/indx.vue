<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active='id'
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <LJi v-if="item.icon" name="monitor" />
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <LJi v-if="item.icon" :name="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                @click="handleMenuItemClick(subitem)"
                :index="subitem.id + ''"
              >
                <LJi v-if="subitem.icon" :name="subitem.icon" />
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import userMenuObj from "@/store/types";
import { useRouter,useRoute } from "vue-router";
import { getMenuId } from "@/utils/map-menus";
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const userMenus = computed<userMenuObj[]>(() => store.state.userMenus);
    const setIcon = (arr: userMenuObj[]) => {
      arr.forEach((v) => {
        if (v.icon) v.icon = v.icon.replace("el-icon-", "");
      });
    };
    setIcon(userMenus.value);
    const router = useRouter();
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found",
      });
    };
    const route = useRoute()
    let {target} = getMenuId(userMenus.value,route.path);
    let id = target.id+'' ?? '2'
    return {
      userMenus,
      handleMenuItemClick,
      id
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  /deep/ .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
