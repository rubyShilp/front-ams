<template>
  <div>
        <div class="ams-home-header">
          <span class="header-left" 
           @click="changeType(1)"
           >
               <b :class="{'header-title':tabType===1}" >学校</b>
               <div class="header-hr" v-if="tabType === 1"></div>
               <div class="header-else" v-else></div>
          </span>
          <span class="header-left" 
           @click="changeType(2)"
           v-if="school!==''"
           >
               <b :class="{'header-title':tabType===2}" >年级</b>
               <div class="header-hr" v-if="tabType === 2"></div>
               <div class="header-else" v-else></div>
          </span>
          <span class="header-left" 
           @click="changeType(3)"
            v-if="school!==''"
           >
               <b :class="{'header-title':tabType===3}" >班级</b>
               <div class="header-hr" v-if="tabType === 3"></div>
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
                 <charts :chartData="chartData_one" chartType="bar" titleText="当前考勤异常学校TOP10" :seriesData="series_one" v-if="chartData_one[0].length!=0"></charts>
               </div>
               <div class="main-echart chart2" style="position:relative;">
                <charts :chartData="chartData_two" chartType="pie" titleText="当前健康异常学校TOP10" v-if="chartData_two[0].length!=0"></charts>
               </div>
          </div>
           <div class="main-content">
               <div class="main-echart chart3" style="position:relative;">
                <charts :chartData="chartData_three" chartType="bar" titleText="学校考勤异常周趋势" :seriesData="series_three" v-if="chartData_three[0].length!=0"></charts>
               </div>
               <div class="main-echart chart4" style="position:relative;">
                <charts :chartData="chartData_four" chartType="line" titleText="学校健康异常周趋势" :seriesData="series_four" v-if="chartData_four[0].length!=0"></charts>
               </div>
          </div>
        </div>
  </div>
</template>
<script src="./homePage.js"></script>
