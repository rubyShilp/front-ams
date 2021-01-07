<template>
  <div class="h5">
    <div class="h5-mainmap">
      <div class="amsh5-top">
        <img src="./../../../images/logo.png" @click="login()" />
        <storng>大数据考勤健康服务平台</storng>
      </div>
      <hr />
      <div class="main-maps">
        <div class="main-maptop">
          <h1>{{ title }}</h1>
          <span>
            截止
            {{ new Date().getTime() | Date("yyyy-MM-dd hh:mm:ss") }}
          </span>
        </div>
        <div class="main-mapsnum">
          <div>
            <div>迟到人数</div>
            <h2>{{ chinaSum.belatecount }}</h2>
          </div>
          <div>
            <div>早退人数</div>
            <h2>{{ chinaSum.leaveearlycount }}</h2>
          </div>
          <div>
            <div>旷课人数</div>
            <h2>{{ chinaSum.truantcount }}</h2>
          </div>
          <div>
            <div>请假人数</div>
            <h2>{{ chinaSum.leavecount }}</h2>
          </div>
          <div>
            <div>体温异常</div>
            <h2>{{ chinaSum.tempecount }}</h2>
          </div>
          <div>
            <div>心率异常</div>
            <h2>{{ chinaSum.heartratecount }}</h2>
          </div>
          <div>
            <div>活动量差</div>
            <h2>{{ chinaSum.lessactivitycount }}</h2>
          </div>
        </div>
        <div class="main-chart">
          <el-button size="mini" type="text" @click="backMap()" class="btn"
            ><i class="el-icon-arrow-left"></i>返回</el-button
          >
          <div id="container"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./h5mainMap.js"></script>

<style scoped>
#container {
  width: 100%;
  height: 29.8rem;
  margin: 0;
}
.btn {
  position: absolute;
  right: 8px;
  z-index: 999;
}
.main-chart {
  position: relative;
}
</style>
