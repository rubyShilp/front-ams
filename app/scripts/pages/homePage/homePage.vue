<template>
  <div>
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
            <span class="main-top-flex">
              <span class="main-top-str">总人数</span>
              <b class="main-top-num" style="color: blue; ">{{arrs.sumschoolcount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">迟到人数</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumbelatecount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">早退人数</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumleaveearlycount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">旷课人数</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumtruantcount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">请假人数</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumleavecount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">体温异常</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumtempecount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">心率异常</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumheartratecount}}</b>
            </span>
            <span class="main-top-flex">
              <span class="main-top-str">活动量差</span>
              <b class="main-top-num" style="color: red; ">{{arrs.sumlessactivitycount}}</b>
            </span>
          </div>
          <div class="main-content">
               <div class="main-echart chart1" style="position:relative;">
                 <charts :chartData="chartData_one" chartType="bar" titleText="当前考勤异常学校TOP10" :seriesData="series_one"></charts>
               </div>
               <div class="main-echart chart2" style="position:relative;">
                <charts :chartData="chartData_two" chartType="pie" titleText="当前健康异常学校TOP10"></charts>
               </div>
          </div>
           <div class="main-content">
               <div class="main-echart chart3" style="position:relative;">
                <charts :chartData="chartData_three" chartType="bar" titleText="学校考勤异常周趋势" :seriesData="series_three"></charts>
               </div>
               <div class="main-echart chart4" style="position:relative;">
                <charts :chartData="chartData_four" chartType="line" titleText="学校健康异常周趋势" :seriesData="series_four"></charts>
               </div>
          </div>
        </div>
  </div>
</template>
<script src="./homePage.js"></script>
