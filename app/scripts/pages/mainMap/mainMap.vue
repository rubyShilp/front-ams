<template>
  <div class="ams-main-screen">
    <div class="bg">
      <div class="ams-main">
        <div class="ams-main-top">
          <div class="ams-img">
            <ul>
              <li class="ams-li">
                <img src="./../../../images/logo.png" />
              </li>
              <li>
                <p>
                  <img src="./../../../images/left.png" class="ams-i" />
                  <span class="ams-p-text">大数据考勤健康服务平台</span>
                  <img src="./../../../images/right.png" class="ams-i" />
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="ams-main-center">
          <div class="ams-right">
            <div class="right-ul" style="top:20px;width:76%;margin: 0 auto;">
              <ul style="width:88%">
                <li>
                  <div class="right-name">总人数</div>
                  <div class="right-number">
                    <h1>{{ attendanceInfo.sumschoolcount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">迟到人数</div>
                  <div class="right-number">
                    <h1
                      style="color: #ed7d31;"
                      v-if="attendanceInfo.sumbelatecount != 0"
                    >
                      {{ attendanceInfo.sumbelatecount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumbelatecount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">早退人数</div>
                  <div class="right-number">
                    <h1
                      style="color: #ed7d31;"
                      v-if="attendanceInfo.sumleaveearlycount != 0"
                    >
                      {{ attendanceInfo.sumleaveearlycount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumleaveearlycount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">旷课人数</div>
                  <div class="right-number">
                    <h1
                      style="color: #ed7d31;"
                      v-if="attendanceInfo.sumtruantcount != 0"
                    >
                      {{ attendanceInfo.sumtruantcount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumtruantcount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">请假人数</div>
                  <div class="right-number">
                    <h1
                      style="color: #ed7d31;"
                      v-if="attendanceInfo.sumleavecount != 0"
                    >
                      {{ attendanceInfo.sumleavecount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumleavecount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">体温异常</div>
                  <div class="right-number">
                    <h1
                      style="color: red;"
                      v-if="attendanceInfo.sumtempecount != 0"
                    >
                      {{ attendanceInfo.sumtempecount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumtempecount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">心率异常</div>
                  <div class="right-number">
                    <h1
                      style="color: red;"
                      v-if="attendanceInfo.sumheartratecount != 0"
                    >
                      {{ attendanceInfo.sumheartratecount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumheartratecount }}</h1>
                  </div>
                </li>
                <li>
                  <div class="right-name">活动量差</div>
                  <div class="right-number">
                    <h1
                      style="color: red;"
                      v-if="attendanceInfo.sumlessactivitycount != 0"
                    >
                      {{ attendanceInfo.sumlessactivitycount }}
                    </h1>
                    <h1 v-else>{{ attendanceInfo.sumlessactivitycount }}</h1>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div id="scrollMap"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./mainMap.js"></script>
