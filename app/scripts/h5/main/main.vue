<template>
  <div class="h5">
    <div class="amsh5-main"></div>
    <div class="h5-center">
      <div class="amsh5-top">
        <img src="./../../../images/logo.png" />
        <span>学生考勤健康服务平台</span>
      </div>
      <div class="h5-main">
        <div class="main-tabs">
          <ul>
            <li @click="initStatistics(1)" :class="{ cur: querytype == 1 }">
              学校
            </li>
            <li @click="initStatistics(2)" :class="{ cur: querytype == 2 }">
              年级
            </li>
            <li @click="initStatistics(3)" :class="{ cur: querytype == 3 }">
              班级
            </li>
          </ul>
          <div class="main-jiank">
            <h1>学校考勤健康情况</h1>
            <p>
              最新数据更新至
              {{ new Date().getTime() | Date("yyyy-MM-dd hh:mm:ss") }}
              <span>数据说明</span>
            </p>
          </div>
          <div class="main-number">
            <div>
              <div>总人数</div>
              <h1>{{ attendanceInfo.sumbelatecount }}</h1>
            </div>
            <div>
              <div>迟到人数</div>
              <h1>{{ attendanceInfo.sumheartratecount }}</h1>
            </div>
            <div>
              <div>早退人数</div>
              <h1>{{ attendanceInfo.sumleavecount }}</h1>
            </div>
            <div>
              <div>旷课人数</div>
              <h1>{{ attendanceInfo.sumleaveearlycount }}</h1>
            </div>
            <div>
              <div>请假数</div>
              <h1>{{ attendanceInfo.sumlessactivitycount }}</h1>
            </div>
            <div>
              <div>体温异常</div>
              <h1>{{ attendanceInfo.sumschoolcount }}</h1>
            </div>
            <div>
              <div>心率异常</div>
              <h1>{{ attendanceInfo.sumtempecount }}</h1>
            </div>
            <div>
              <div>活动量差</div>
              <h1>{{ attendanceInfo.sumtruantcount }}</h1>
            </div>
          </div>
        </div>
        <div class="main-tabs chart2" style="position:relative;">
          <ams-chart
            :chartData="chartData_two"
            v-if="chartData_two[0].length!=0"
            chartType="bar"
            titleText="当前学校考勤状态TOP10"
            :seriesData="series_two"
            :h5="true"
          ></ams-chart>
        </div>
        <div class="main-tabs chart3" style="position:relative;">
          <ams-chart
            :chartData="chartData_three"
            v-if="chartData_three[0].length!=0"
            chartType="bar"
            titleText="当前学校健康异常TOP10"
            :seriesData="series_three"
            :h5="true"
          ></ams-chart>
        </div>
        <div class="main-tabs chart1" style="position:relative;">
          <ams-chart
            :chartData="chartData_one"
            chartType="line"
            titleText="当前健康异常周趋势"
            :seriesData="series_one"
            v-if="chartData_one[0].length!=0"
          ></ams-chart>
        </div>
        <div class="main-tabs chart5" style="position:relative;">
          <ams-chart
            :chartData="chartData_five"
            :indicatorData="indicator_five"
            chartType="radar"
            titleText="学校考勤异常周趋势"
            v-if="chartData_five[0].length!=0"
          ></ams-chart>
        </div>
        <div class="main-table">
          <div class="main-table-tabs">
            <ul>
              <li @click="initStatistics(1)" :class="{ cur: querytype == 1 }">
                学校
              </li>
              <li @click="initStatistics(2)" :class="{ cur: querytype == 2 }">
                年级
              </li>
              <li @click="initStatistics(3)" :class="{ cur: querytype == 3 }">
                班级
              </li>
            </ul>
          </div>
          <div class="main-jiank">
            <h1>学校考勤健康统计汇总</h1>
            <p>
              最新数据更新至
              {{ new Date().getTime() | Date("yyyy-MM-dd hh:mm:ss") }}
              <span>数据说明</span>
            </p>
          </div>
          <div class="table-min">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <td>学校</td>
                  <td>迟到</td>
                  <td>早退</td>
                  <td>体温异常</td>
                  <td>心率异常</td>
                  <!-- <td>详情</td> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList" :key="index">
                  <td>{{ item.basename }}</td>
                  <td>{{ item.sumbelatecount }}</td>
                  <td>{{ item.sumleaveearlycount }}</td>
                  <td>{{ item.sumtempecount }}</td>
                  <td>{{ item.sumheartratecount }}</td>
                  <!-- <td>详情</td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-duo">
            查看更多<i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./main.js"></script>
