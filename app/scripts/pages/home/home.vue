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
              <a href="javaScript:;"><i class="el-icon-s-home"></i>首页</a>
            </li>
            <li>
              <a href="javaScript:;"><i class="el-icon-s-data"></i>统计管理</a>
            </li>
            <li>
              <a href="javaScript:;"
                ><i class="el-icon-bank-card"></i>考勤管理</a
              >
            </li>
            <li>
              <a href="javaScript:;"><i class="el-icon-s-home"></i>学院管理</a>
            </li>
            <li>
              <a href="javaScript:;"
                ><i class="el-icon-s-custom"></i>账号中心</a
              >
            </li>
          </ul>
        </div>
        <div class="ams-seting">
          <el-select v-model="name" @change="select">
            <el-option
              v-for="item in treList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <a href="javaScript:;" class="ams-cut-word">
            <span class="ams-cut-text">
              <i class="el-icon-s-tools"></i>
            </span>
            <span class="ams-cut-title">设置</span>
          </a>
          <a href="javaScript:;" class="ams-cut-word">
            <span class="ams-cut-text">
              <i class="el-icon-s-tools"></i>
            </span>
            <span class="ams-cut-title" style="right: 20px">退出</span>
          </a>
        </div>
      </div>
    </header>
    <el-scrollbar class="main-center">
      <!-- <router-view></router-view> -->
        <div class="ams-home-header">
          <span class="header-left" 
           v-for="item in tabs" 
           :key="item.id"
           @click="changeType(item.id)"
           >
             <b :class="{'header-title':tabType===item.id}" >{{item.name}}</b>
             <div class="header-hr" v-if="tabType === item.id"></div>
             <div class="header-else" v-else></div>
          </span>
        </div>
        <div  class="ams-home-main">
          <div class="main-top">
            <span class="main-top-flex" v-for="item in arrs" :key="item.id">
              <span class="main-top-str">{{item.title}}</span>
              <b class="main-top-num" :style="{'color': item.color}">{{item.count}}</b>
            </span>
          </div>
          <div class="main-content">
               <div class="main-echart">
                 <charts :chartData="chartData_one" chartType="bar" titleText="当前考勤异常学校TOP10" :seriesData="series_one"></charts>
               </div>
               <div class="main-echart">
                <charts :chartData="chartData_two" chartType="pie" titleText="当前健康异常学校TOP10"></charts>
               </div>
          </div>
           <div class="main-content">
               <div class="main-echart">
                <!-- <charts :chartData="chartData_three" chartType="bar"></charts> -->
               </div>
               <div class="main-echart">
                <!-- <charts :chartData="chartData_four" chartType="line"></charts> -->
               </div>
          </div>
        </div>
    </el-scrollbar>
  </div>
</template>
<script src="./home.js"></script>
