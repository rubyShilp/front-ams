<template>
  <div class="ams-main-screen">
    <div class="bg">
      <div class="map-log" style="z-index:999">
        <div class="img">
          <img src="./../../../images/logo.png" @click="login()" />
        </div>
        <div class="title">
          <h1>大数据考勤健康服务平台</h1>
        </div>
      </div>
      <!-- <div class="sub-map">
        <p>
          迟到人数：
          <span
            style="margin-left: 50px;"
            :style="{ color: attendanceInfo.belatecount > 0 ? '#057bfb' : '' }"
            >{{ attendanceInfo.belatecount }}</span
          >
        </p>
        <p>
          早退人数：<span
            style="margin-left: 50px;"
            :style="{
              color: attendanceInfo.leaveearlycount > 0 ? '#01edfb' : '',
            }"
            >{{ attendanceInfo.leaveearlycount }}</span
          >
        </p>
        <p>
          旷课人数：<span
            style="margin-left: 50px;"
            :style="{ color: attendanceInfo.truantcount > 0 ? '#ed7d31' : '' }"
            >{{ attendanceInfo.truantcount }}</span
          >
        </p>
        <p>
          请假人数：<span
            style="margin-left: 50px;"
            :style="{ color: attendanceInfo.leavecount > 0 ? '#fbdb27' : '' }"
            >{{ attendanceInfo.leavecount }}</span
          >
        </p>
        <p>
          体温异常人数：<span
            style="margin-left: 25px;"
            :style="{ color: attendanceInfo.tempecount > 0 ? 'red' : '' }"
            >{{ attendanceInfo.tempecount }}</span
          >
        </p>
        <p>
          心率异常人数：<span
            style="margin-left: 25px;"
            :style="{ color: attendanceInfo.belatecount > 0 ? 'red' : '' }"
            >{{ attendanceInfo.heartratecount }}</span
          >
        </p>
        <p>
          活动量少人数：<span
            style="margin-left: 25px;"
            :style="{ color: attendanceInfo.belatecount > 0 ? 'red' : '' }"
            >{{ attendanceInfo.lessactivitycount }}</span
          >
        </p>
      </div> -->
      <div class="sub-tab">
        <el-form label-width="120px" size="mini" style="text-align: center;">
          <el-form-item label="迟到人数:">
            <span
              :style="{
                color: attendanceInfo.belatecount > 0 ? '#057bfb' : '',
              }"
              >{{ attendanceInfo.belatecount }}</span
            >
          </el-form-item>
          <el-form-item label="早退人数:">
            <span
              :style="{
                color: attendanceInfo.leaveearlycount > 0 ? '#01edfb' : '',
              }"
              >{{ attendanceInfo.leaveearlycount }}</span
            >
          </el-form-item>
          <el-form-item label="旷课人数:">
            <span
              :style="{
                color: attendanceInfo.truantcount > 0 ? '#ed7d31' : '',
              }"
              >{{ attendanceInfo.truantcount }}</span
            >
          </el-form-item>
          <el-form-item label="请假人数:">
            <span
              :style="{ color: attendanceInfo.leavecount > 0 ? '#fbdb27' : '' }"
              >{{ attendanceInfo.leavecount }}</span
            >
          </el-form-item>
          <el-form-item label="体温异常人数:">
            <span
              :style="{ color: attendanceInfo.tempecount > 0 ? 'red' : '' }"
              >{{ attendanceInfo.tempecount }}</span
            >
          </el-form-item>
          <el-form-item label="心率异常人数:">
            <span
              :style="{ color: attendanceInfo.belatecount > 0 ? 'red' : '' }"
              >{{ attendanceInfo.heartratecount }}</span
            >
          </el-form-item>
          <el-form-item label="活动量少人数:">
            <span
              :style="{ color: attendanceInfo.belatecount > 0 ? 'red' : '' }"
              >{{ attendanceInfo.lessactivitycount }}</span
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="ams-main-center">
        <div id="scrollMap"></div>
      </div>
    </div>
  </div>
</template>
<script src="./mainMap.js"></script>
