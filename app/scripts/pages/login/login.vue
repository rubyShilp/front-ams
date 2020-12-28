<template>
  <div class="login-main">
    <div class="login-wrap">
      <div class="login-header">
        <div class="login">
          <img src="./../../../images/logo.png" />
        </div>
        <div class="regrit">
          <el-button type="primary" @click="registered()" plain
            >注&nbsp;册</el-button
          >
        </div>
      </div>
      <div class="login-form">
        <h1>欢迎登录阿拉町</h1>
        <ul class="login-regrit-list">
          <li>
            <p class="login-regrit-input-title">手机号</p>
            <input
              v-model="user.account"
              placeholder="请输入手机号"
              autocomplete="off"
              maxlength="11"
            />
          </li>
          <li>
            <p class="login-regrit-input-title">密码</p>
            <input
              v-model="user.code"
              placeholder="请输入密码"
              autocomplete="off"
              type="password"
              maxlength="16"
            />
          </li>
        </ul>
        <div class="login-auto-li">
          <p><a href="/retrieve">忘记密码？</a></p>
        </div>
        <div class="button-box">
          <el-button type="primary" @click="login()">
            登&nbsp;&nbsp;录
          </el-button>
        </div>
      </div>
    </div>
    <!--忘记密码-->
  </div>
</template>
<script src="./login.js"></script>
