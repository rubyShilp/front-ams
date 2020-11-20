<template>
  <div class="login-main">
    <div class="login-wrap">
      <div class="login-header">
        <div class="login">
          <img src="./../../../images/logo.png" />
        </div>
        <div class="regrit">
          <el-button type="primary" plain>注&nbsp;册</el-button>
        </div>
      </div>
      <div class="login-form">
        <h1>欢迎登陆阿拉町</h1>
        <ul class="login-regrit-list">
          <li>
            <p class="login-regrit-input-title">手机号</p>
            <input
              placeholder="请输入手机号"
              autocomplete="off"
              maxlength="11"
            />
          </li>
          <li>
            <p class="login-regrit-input-title">密码</p>
            <input placeholder="请输入密码" autocomplete="off" />
          </li>
        </ul>
        <div class="login-auto-li">
          <p><a href="javaScript:;">忘记密码？</a></p>
        </div>
        <div class="button-box">
          <el-button type="primary">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
