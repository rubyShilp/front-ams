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
            <li class="cur">学校</li>
            <li>年级</li>
            <li>班级</li>
          </ul>
          <div class="main-jiank">
            <h1>学校考勤健康情况</h1>
            <p>最新数据更新至2020-12-20 10:00 <span>数据说明</span></p>
          </div>
          <div class="main-number">
            <div>
              <div>总人数</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>迟到人数</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>早退人数</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>旷课人数</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>请假数</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>体温异常</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>心率异常</div>
              <h1>3000</h1>
            </div>
            <div>
              <div>活动量差</div>
              <h1>3000</h1>
            </div>
          </div>
        </div>
        <div class="main-tabs">
          <ams-chart
            :chartData="chartData_two"
            chartType="bar"
            titleText="当前学校考勤状态TOP10"
            :seriesData="series_two"
            theme="main"
          ></ams-chart>
        </div>
        <div class="main-tabs">
          <ams-chart
            :chartData="chartData_three"
            chartType="bar"
            titleText="当前学校健康异常TOP10"
            :seriesData="series_three"
            theme="main"
          ></ams-chart>
        </div>
        <div class="main-tabs">
          <ams-chart
            :chartData="chartData_one"
            chartType="line"
            titleText="当前健康异常周趋势"
            :seriesData="series_one"
            theme="main"
          ></ams-chart>
        </div>
        <div class="main-tabs">
          <ams-chart
            :chartData="chartData_five"
            :indicatorData="indicator_five"
            chartType="radar"
            titleText="学校考勤异常周趋势"
          ></ams-chart>
        </div>
        <div class="main-table">
          <div class="main-table-tabs">
            <ul>
              <li class="cur">
                学校
              </li>
              <li>
                年级
              </li>
              <li>
                班级
              </li>
            </ul>
          </div>
          <div class="main-jiank">
            <h1>学校考勤健康统计汇总</h1>
            <p>最新数据更新至2020-12-20 10:00 <span>数据说明</span></p>
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
                  <td>详情</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list of [1, 2, 3, 4, 5, 6, 7, 8]" :key="list">
                  <td>学校</td>
                  <td>迟到</td>
                  <td>早退</td>
                  <td>体温异常</td>
                  <td>心率异常</td>
                  <td>详情</td>
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
