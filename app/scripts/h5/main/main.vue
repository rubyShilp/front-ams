<template>
  <div class="h5">
    <div class="amsh5-main"></div>
    <div class="h5-center">
      <div class="amsh5-top">
        <img src="./../../../images/logo.png" />
        <span>大数据考勤健康服务平台</span>
      </div>
      <div class="h5-main">
        <div class="main-tabs">
          <!-- <ul>
            <li @click="initStatistics('top',1)" :class="{ cur: querytype == 1 }">
              学校
            </li>
            <li @click="initStatistics('top',2)" :class="{ cur: querytype == 2 }">
              年级
            </li>
            <li @click="initStatistics('top',3)" :class="{ cur: querytype == 3 }">
              班级
            </li>
            <li>
              <el-select v-model="schoolcode" @change="selectSchool()">
                <el-option
                  v-for="item in schoolList"
                  :key="item.schoolname"
                  :label="item.schoolname"
                  :value="item.schoolcode"
                >
                </el-option>
              </el-select>
            </li>
          </ul> -->
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
              <h1>{{ attendanceInfo.sumschoolcount }}</h1>
            </div>
            <div>
              <div>迟到人数</div>
              <h1>{{ attendanceInfo.sumbelatecount }}</h1>
            </div>
            <div>
              <div>早退人数</div>
              <h1>{{ attendanceInfo.sumleaveearlycount }}</h1>
            </div>
            <div>
              <div>旷课人数</div>
              <h1>{{ attendanceInfo.sumtruantcount }}</h1>
            </div>
            <div>
              <div>请假人数</div>
              <h1>{{ attendanceInfo.sumleavecount }}</h1>
            </div>
            <div>
              <div>体温异常</div>
              <h1>{{ attendanceInfo.sumtempecount }}</h1>
            </div>
            <div>
              <div>心率异常</div>
              <h1>{{ attendanceInfo.sumheartratecount }}</h1>
            </div>
            <div>
              <div>活动量差</div>
              <h1>{{ attendanceInfo.sumlessactivitycount }}</h1>
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
                  <td>{{tagname}}</td>
                  <td>迟到</td>
                  <td>早退</td>
                  <td>体温异常</td>
                  <td>心率异常</td>
                  <!-- <td>详情</td> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in showdetailList" :key="index">
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
          <div class="table-duo" v-if="dataList.length > 7" @click="changeFoldState(1)">
            {{brandFold?'查看更多':'收起'}}<i v-show="brandFold===true" class="el-icon-arrow-down"></i>
            <i v-show="brandFold===false" class="el-icon-arrow-up"></i>
          </div>
        </div>
        <div class="main-table2">
          <div class="main-jiank">
             <h1>异常实时数据</h1>
          </div>
          <div class="table-min">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <td>姓名</td>
                  <td>考勤状态</td>
                  <td>体温(℃)</td>
                  <td>心率(次/分钟)</td>
                  <td>学校</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list of showdetailList2" :key="list.sno">
                  <td>{{ list.stuname }}</td>
                  <td  :class="{
                                attendsnormalColor: list.attendstate === '0',
                                attendsabnormalColor: list.attendstate !== '0',
                              }">{{ list.attendstate | kaoqinStatu }}</td>
                  <td :class="{
                                temperaturenormalColor:
                                  list.temperature <= 37.3 ||
                                  list.temperature >= 34,
                                temperatureabnormalColor:
                                  list.temperature > 37.3 ||
                                  list.temperature < 34,
                              }">{{ list.temperature }}</td>
                  <td :class="{
                                heartnormalColor:
                                  list.heartrate <= 120 || list.heartrate >= 60,
                                heartabnormalColor:
                                  list.heartrate > 120 || list.heartrate < 60,
                              }">{{ list.heartrate }}</td>
                  <td>{{ list.schoolname }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-duo" v-if="attendanceList.length > 7" @click="changeFoldState(2)">
            {{brandFold2?'查看更多':'收起'}}<i v-show="brandFold2===true" class="el-icon-arrow-down"></i>
            <i v-show="brandFold2===false" class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./main.js"></script>
