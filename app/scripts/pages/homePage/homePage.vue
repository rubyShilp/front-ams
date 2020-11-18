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
                <charts :chartData="chartData_three" chartType="bar" titleText="学校考勤异常周趋势" :seriesData="series_three"></charts>
               </div>
               <div class="main-echart">
                <charts :chartData="chartData_four" chartType="line" titleText="学校健康异常周趋势" :seriesData="series_four"></charts>
               </div>
          </div>
        </div>
  </div>
</template>
<script src="./homePage.js"></script>
