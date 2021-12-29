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

<script>
import { reactive } from 'vue';
import { rules } from '../config/account-config'
export default {
    setup() {
        let account = reactive({
            name:'',
            password:""
        })
        let submit = ()=>{
            console.log('1111111');
        }
        return {
            account,
            rules,
            submit
        }
    }
};
</script>

<style></style>
