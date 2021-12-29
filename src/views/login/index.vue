<template>
  <div class="login">
    <login-layout class="layout" />
  </div>
</template>

<script lang="ts">
import LoginLayout from './cpns/login-layout.vue'
export default {
  components: {
    LoginLayout,
  }
}
</script>

<style scoped lang='less'>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  .layout {
    margin-top: 250px;
  }
}
</style>
