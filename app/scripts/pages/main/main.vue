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
                    <div class="table-div">
                      <table cellspacing="0">
                        <tbody>
                          <tr
                            class="border"
                            v-for="list of attendanceList"
                            :key="list.sno"
                          >
                            <td>{{ list.sno }}</td>
                            <td>{{ list.stuname }}</td>
                            <td>{{ list.attendstate }}</td>
                            <td>{{ list.heartrate }}</td>
                            <td>{{ list.temperature }}</td>
                            <td>
                              <div>{{ list.schoolname }}</div>
                            </td>
                            <td>
                              <div>{{ list.gradeclassname }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-trend chart1">
                <ams-chart
                  v-if="isOne"
                  :chartData="chartData_one"
                  chartType="line"
                  titleText="当前考勤异常周趋势"
                  :seriesData="series_one"
                  theme="main"
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
                      <h1>{{ attendanceInfo.sumbelatecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">早退人数</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumleaveearlycount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">旷课人数</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumtruantcount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">请假人数</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumleavecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">体温异常</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumtempecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">心率异常</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumheartratecount }}</h1>
                    </div>
                  </li>
                  <li>
                    <div class="right-name">活动量差</div>
                    <div class="right-number">
                      <h1>{{ attendanceInfo.sumlessactivitycount }}</h1>
                    </div>
                  </li>
                </ul>
              </div>
              <el-container style="width:100%">
                <el-aside width="750px">
                  <div class="right-school chart2">
                    <ams-chart
                      v-if="isTwo"
                      :chartData="chartData_two"
                      chartType="bar"
                      titleText="当前考勤异常学校TOP10"
                      :seriesData="series_two"
                      theme="main"
                    ></ams-chart>
                  </div>
                  <div class="right-school marign-top chart3">
                    <ams-chart
                      v-if="isThree"
                      :chartData="chartData_three"
                      chartType="bar"
                      titleText="当前健康异常学校TOP10"
                      :seriesData="series_three"
                      theme="main"
                    ></ams-chart>
                  </div>
                </el-aside>
                <el-main style="padding-top: 0px">
                  <div class="right-temperature chart4">
                    <ams-chart
                      v-if="isFour"
                      :chartData="chartData_four"
                      chartType="pie"
                      titleText="当前体温概括"
                      theme="main"
                    ></ams-chart>
                  </div>
                  <div class="right-healthy chart5">
                    <ams-chart
                      v-if="isFive"
                      :chartData="chartData_five"
                      :indicatorData="indicator_five"
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
          —— 本数据有深圳阿拉町科技发展有限公司提供技术支持 ——
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script src="./main.js"></script>
