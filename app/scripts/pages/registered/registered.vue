<template>
  <div class="login-main">
    <div class="login-wrap">
      <div class="login-header">
        <div class="login">
          <img src="./../../../images/logo.png" />
        </div>
      </div>
      <div class="back">
        <i class="el-icon-arrow-left"></i>
        <a href="/login">返回</a>
      </div>
      <div class="login-form registered-form">
        <h1>欢迎注册阿拉町</h1>
        <ul class="login-regrit-list">
          <li>
            <p class="login-regrit-input-title">手机号</p>
            <input
              v-model="user.phone"
              placeholder="请输入手机号"
              autocomplete="off"
              maxlength="11"
            />
          </li>
          <li>
            <p class="login-regrit-input-title">密码</p>
            <input
              v-model="user.loginPwd"
              placeholder="请输入密码"
              autocomplete="off"
              type="password"
              minlength="8"
              maxlength="16"
            />
          </li>
          <li>
            <p class="login-regrit-input-title">确认密码</p>
            <input
              v-model="user.againPwd"
              placeholder="请输入确认密码"
              autocomplete="off"
              type="password"
              minlength="8"
              maxlength="16"
            />
          </li>
        </ul>
        <div class="button-box" style="margin-top:40px">
          <el-button type="primary" @click="registered()">
            注&nbsp;&nbsp;册
          </el-button>
        </div>
        <p class="go-login" style="color:#9ea0a3">
          已有账号？<a href="/login">直接登录</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script src="./registered.js"></script>
