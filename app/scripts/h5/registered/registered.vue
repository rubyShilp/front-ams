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
            v-model="user.phone"
            placeholder="请输入手机号"
            autocomplete="off"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.loginPwd"
            placeholder="请输入密码"
            autocomplete="off"
            type="password"
            minlength="8"
            maxlength="16"
          />
        </el-form-item>
        <el-form-item>
          <el-col :span="13">
            <el-input
              v-model="user.againPwd"
              placeholder="再次确认密码"
              autocomplete="off"
              type="password"
              minlength="8"
              maxlength="16"
            />
          </el-col>
          <el-col :span="11">
            <el-button
              type="primary"
              @click="smsSendCode()"
              style="width:90%;height:40px"
              id="codeSms"
            >
              获取验证码
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registered()" style="width: 100%;">
            注&nbsp;&nbsp;册
          </el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:center;font-size: 0.818rem;color: #959595;">
        已有账号?<a href="/login">立即登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import registered from "@/pages/registered/registered.js";
export default {
  mixins: [registered],
};
</script>
