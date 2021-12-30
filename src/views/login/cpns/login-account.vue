<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { rules } from "../config/account-config";
import localCache from "@/utils/cache";
import { useStore } from "vuex";
export default {
  setup() {
    let account = reactive({
      name: "",
      password: "",
    });
    const formRef = ref();
    const store = useStore();
    let submit = (isKeepPassword: boolean) => {
      formRef.value.validate((isok: boolean) => {
        if (isok) {
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          store.dispatch("accountLoginAction", { ...account });
        }
      });
    };
    return {
      account,
      rules,
      submit,
      formRef,
    };
  },
};
</script>

<style></style>
