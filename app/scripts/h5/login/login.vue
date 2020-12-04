<template>
  <div class="h5-login">
    <div class="h5-login-logo">
      <img src="./../../../images/logo.png" />
    </div>
    <h1 class="h5-login-h1">欢迎登录阿拉町</h1>
    <div class="h5-login-form">
      <el-form>
        <el-form-item>
          <el-input
            v-model="user.account"
            placeholder="请输入手机号"
            autocomplete="off"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.code"
            placeholder="请输入密码"
            autocomplete="off"
            type="password"
            maxlength="16"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" style="width: 100%;">
            登&nbsp;&nbsp;录
          </el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right;font-size: 0.818rem">
        <a href="javaScript:;">忘记密码?</a>
      </div>
      <div style="text-align: left;font-size: 0.818rem;color: #959595;">
        还没有账号?<a href="/registered">立即注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import login from "@/pages/login/login.js";
export default {
  mixins: [login],
};
</script>
