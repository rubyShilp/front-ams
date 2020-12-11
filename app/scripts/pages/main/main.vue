<template>
  <div class="ams-main-screen">
    <div class="bg">
      <el-scrollbar class="ams-main">
        <div class="ams-main-top">
          <div class="ams-img">
            <ul>
              <li class="ams-li">
                <img src="./../../../images/logo.png" />
              </li>
              <li>
                <p>
                  <img src="./../../../images/left.png" class="ams-i" />
                  <span class="ams-p-text">阿拉町学生考勤健康服务平台</span>
                  <img src="./../../../images/right.png" class="ams-i" />
                </p>
              </li>
              <li class="ams-date-school">
                <div class="date">
                  {{ date }}<span class="time">{{ time }}</span>
                </div>
                <div class="ams-school-seting">
                  <el-select v-model="schoolcode" @change="selectSchool()">
                    <el-option
                      v-for="item of schoolList"
                      :key="item.schoolname"
                      :label="item.schoolname"
                      :value="item.schoolcode"
                    >
                    </el-option>
                  </el-select>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="ams-main-center">
          <el-container>
            <el-aside width="600px" class="ams-left">
              <div class="left-top10">
                <div class="top10-center">
                  <p class="top10-text">
                    <span class="top10-span">异常实时数据</span>异常100人
                  </p>
                  <div class="top10-table">
                      <table cellspacing="0">
                      <thead>
                        <tr>
                          <td>学号</td>
                          <td>姓名</td>
                          <td>考勤状态</td>
                          <td>体温状态</td>
                          <td>心率状态</td>
                          <td>学校</td>
                          <td>班级</td>
                        </tr>
                      </thead>
                    </table>
                    <el-scrollbar class="table-div" style="height:21rem;">
                      <table cellspacing="0">
                        <tbody>
                          <tr
                            class="border"
                            v-for="list of attendanceList"
                            :key="list.sno"
                          >
                            <td>{{ list.sno }}</td>
                            <td>
                              <div>{{ list.stuname }}</div>
                            </td>
                            <td :class="{'attendsnormalColor':list.attendstate==='0','attendsabnormalColor':list.attendstate!=='0'}">{{ list.attendstate |kaoqinStatu}}</td>
                            <td :class="{'temperaturenormalColor': list.temperature<=37.3 || list.temperature>=34,'temperatureabnormalColor': list.temperature>37.3||list.temperature<34}">{{ list.temperature }}</td>
                            <td :class="{'heartnormalColor': list.heartrate<=120 || list.heartrate>=60,'heartabnormalColor': list.heartrate>120||list.heartrate<60}">{{ list.heartrate }}</td>
                            <td>
                              <div>{{ list.schoolname }}</div>
                            </td>
                            <td>
                              <div>{{ list.gradeclassname }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </el-scrollbar>
                  </div>
                </div>
              </div>
              <div class="left-trend chart1" style="position:relative;">
                <ams-chart
                  :chartData="chartData_one"
                  chartType="line"
                  titleText="当前考勤异常周趋势"
                  :seriesData="series_one"
                  theme="main"
                  v-if="chartData_one[0].length!=0"
                ></ams-chart>
              </div>
            </el-aside>
            <el-main class="ams-right">
              <div class="right-ul">
                <ul>
                  <li>
                    <div class="right-name">总人数</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumschoolcount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">迟到人数</div>
                    <div class="right-number">
                      <h1 style="color: #ed7d31;" v-if="attendanceInfo.sumbelatecount!=0">{{ attendanceInfo.sumbelatecount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumbelatecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">早退人数</div>
                    <div class="right-number">
                      <h1 style="color: #ed7d31;" v-if="attendanceInfo.sumleaveearlycount!=0">{{ attendanceInfo.sumleaveearlycount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumleaveearlycount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">旷课人数</div>
                    <div class="right-number">
                      <h1 style="color: #ed7d31;" v-if="attendanceInfo.sumtruantcount!=0">{{ attendanceInfo.sumtruantcount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumtruantcount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">请假人数</div>
                    <div class="right-number">
                      <h1 style="color: #ed7d31;" v-if="attendanceInfo.sumleavecount!=0">{{ attendanceInfo.sumleavecount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumleavecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">体温异常</div>
                    <div class="right-number">
                      <h1 style="color: red;" v-if="attendanceInfo.sumtempecount!=0">{{ attendanceInfo.sumtempecount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumtempecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">心率异常</div>
                    <div class="right-number">
                      <h1 style="color: red;"  v-if="attendanceInfo.sumheartratecount!=0">{{ attendanceInfo.sumheartratecount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumheartratecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">活动量差</div>
                    <div class="right-number">
                      <h1 style="color: red;" v-if="attendanceInfo.sumlessactivitycount!=0">{{ attendanceInfo.sumlessactivitycount }}</h1>
                      <h1 v-else>{{ attendanceInfo.sumlessactivitycount }}</h1>
                    </div>
                  </li>
                </ul>
              </div>
              <el-container style="width:100%">
                <el-aside width="750px">
                  <div class="right-school chart2" style="position:relative;">
                    <ams-chart
                      :chartData="chartData_two"
                      v-if="chartData_two[0].length!=0"
                      chartType="bar"
                      titleText="当前考勤异常学校TOP10"
                      :seriesData="series_two"
                      theme="main"
                    ></ams-chart>
                  </div>
                  <div class="right-school marign-top chart3" style="position:relative;">
                    <ams-chart
                      :chartData="chartData_three"
                      v-if="chartData_three[0].length!=0"
                      chartType="bar"
                      titleText="当前健康异常学校TOP10"
                      :seriesData="series_three"
                      theme="main"
                    ></ams-chart>
                  </div>
                </el-aside>
                <el-main style="padding-top: 0px">
                  <div class="right-temperature chart4" style="position:relative;">
                    <ams-chart
                      :chartData="chartData_four"
                      v-if="chartData_four[0].length!=0"
                      chartType="pie"
                      titleText="当前体温概括"
                      theme="main"
                    ></ams-chart>
                  </div>
                  <div class="right-healthy chart5" style="position:relative;">
                    <ams-chart
                      :chartData="chartData_five"
                      :indicatorData="indicator_five"
                       v-if="chartData_five[0].length!=0"
                      chartType="radar"
                      titleText="学校健康异常周趋势"
                    ></ams-chart>
                  </div>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </div>
        <div class="ams-bottom-text">
          —— 本数据由深圳阿拉町科技发展有限公司提供技术支持 ——
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script src="./main.js"></script>
