<template>
  <div>
    <header class="ams-top">
      <div class="ams-top-center">
        <div class="ams-img-logo">
          <img src="./../../../images/logo.png" />
        </div>
        <div class="ams-ul-left">
          <ul>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 0 }"
                @click="selectRouter('/home/homePage', 0)"
                ><i class="el-icon-s-home"></i>首页</a
              >
            </li>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 1 }"
                @click="selectRouter('/home/statisticalManage', 1)"
                ><i class="el-icon-s-data"></i>统计管理</a
              >
            </li>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 2 }"
                @click="selectRouter('/home/record', 2)"
                ><i class="el-icon-bank-card"></i>考勤管理</a
              >
            </li>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 3 }"
                @click="selectRouter('/home/schoolManage', 3)"
                ><i class="el-icon-s-home"></i>学院管理</a
              >
            </li>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 4 }"
                v-show="userData.userType !== 2"
                @click="selectRouter('/home/user', 4)"
                ><i class="el-icon-s-custom"></i>账号中心</a
              >
            </li>
            <li>
              <a
                href="javaScript:;"
                :class="{ cur: index == 5 }"
                v-show="userData.userType !== 2"
                @click="selectRouter('/home/fenceManage', 5)"
                ><i class="el-icon-location-outline"></i>围栏管理</a
              >
            </li>
          </ul>
        </div>
        <div class="ams-seting">
          <el-select v-model="schoolcode" @change="select">
            <el-option
              v-for="item in schoolList"
              :key="item.schoolname"
              :label="item.schoolname"
              :value="item.schoolcode"
            >
            </el-option>
          </el-select>
          <a href="/main" class="ams-cut-word">
            <span class="ams-cut-text">
              <i class="el-icon-platform-eleme"></i>
            </span>
            <span class="ams-cut-title">首页</span>
          </a>
          <a href="javaScript:;" class="ams-cut-word" @click="showUserInfo()">
            <span class="ams-cut-text">{{ nickname }}</span>
          </a>
          <a href="javaScript:;" class="ams-cut-word" @click="loginOut()">
            <span class="ams-cut-text">
              <i class="use-drop-exit"></i>
            </span>
            <span class="ams-cut-title" style="right: 20px">退出</span>
          </a>
        </div>
      </div>
    </header>
    <el-dialog
      title="用户信息"
      width="28%"
      top="5vh"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      :show-close="false"
      class="school_dialog"
    >
      <el-form class="form" :model="userData" ref="handleForm">
        <el-form-item label="用户昵称:" label-width="120px"
          ><span>{{ userData.nickname }}</span></el-form-item
        >
        <el-form-item label="联系方式:" label-width="120px"
          ><span>{{ userData.phone }}</span></el-form-item
        >
        <el-form-item label="用户性别:" label-width="120px"
          ><span>{{ userData.sex | sexName }}</span></el-form-item
        >
        <el-form-item label="用户类型:" label-width="120px"
          ><span>{{ userData.userType | userTypeFil }}</span></el-form-item
        >
        <el-form-item label="出生日期:" label-width="120px"
          ><span>{{ userData.birthday }}</span></el-form-item
        >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-scrollbar class="main-center">
      <router-view :school="schoolcode"></router-view>
    </el-scrollbar>
  </div>
</template>
<script src="./home.js"></script>
