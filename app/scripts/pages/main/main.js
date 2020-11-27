import charts from "@/components/charts";
import * as mainServer from "./main.server.js";
import { formDate } from "@/util/core.js";
export default {
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      isOne: false,
      isThree: false,
      isTwo: false,
      isFour: false,
      isFive: false,
      attendanceList: [], //考勤实时数据
      attendanceInfo: {}, //考勤异常数据汇总
      chartData_one: [[], [0, 5, 10, 15]],
      series_one: [["迟到", "早退", "旷课", "请假"], [], "3"],
      chartData_two: [[], [0, 5, 10, 15]],
      series_two: [["迟到", "早退", "旷课", "请假"], [], "2"],
      chartData_three: [[], [0, 50, 100, 150]],
      series_three: [["温度", "心率", "活动量差"], [], "1"],
      chartData_four: [
        [],
        ["35.9°C以下", "36°C-37.2°C", "37°C-38°C", "38°C-39°C"],
      ],
      indicator_five: [[], [], [], ["温度", "心率", "活动量差"]],
      chartData_five: [[], [100, 100, 100, 100, 100, 100, 100]],
      time: "",
      date: "",
      schoolcode: "",
      schoolList: [], //所有学校信息
    };
  },
  beforeMount() {
    var timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
    this.initGetSchool();
  },
  methods: {
    //初始化学校信息
    initGetSchool() {
      let params = {};
      mainServer.getSchool(params).then((res) => {
        if (res.success) {
          this.schoolList = res.resultMap.schools;
          this.schoolcode = this.schoolList[0].schoolcode;
          this.initSumTop();
          this.initAttendTop(1);
          this.initAttendTop(2);
          this.initHealthTop(1);
          this.initHealthTop(2);
          // this.initStatisticsTemper();
          // this.initStatisticsReal(1);
        }
      });
    },
    //选择学校查询信息
    selectSchool() {
      this.initSumTop();
      this.initAttendTop(1);
      this.initAttendTop(2);
      this.initHealthTop(1);
      this.initHealthTop(2);
      this.initStatisticsTemper();
      this.initStatisticsReal(1);
    },
    //统计考勤异常数据
    initAttendTop(type) {
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        querytype: "1",
        sorttype: "1",
        page: "1",
        pagesize: "10",
      };
      if (type == 1) {
        params.starttime = formDate(
          new Date("2020-11-10"),
          "yyyy-MM-dd hh:mm:ss"
        );
        params.endtime = formDate(
          new Date("2020-11-20"),
          "yyyy-MM-dd hh:mm:ss"
        );
      } else {
        params.starttime = formDate(
          new Date("2020-11-10"),
          "yyyy-MM-dd hh:mm:ss"
        );
        params.endtime = formDate(
          new Date("2020-11-20"),
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      mainServer.attendTop(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.abAttendTop;
          if (type == 1) {
            this.chartData_two[0] = [];
            this.series_two[1][0] = [];
            this.series_two[1][1] = [];
            this.series_two[1][2] = [];
            this.series_two[1][3] = [];
            for (let i = 0; i < list.length; i++) {
              this.chartData_two[0].push(list[i].basename);
              this.series_two[1][0].push(list[i].sumbelatecount);
              this.series_two[1][1].push(list[i].sumleavecount);
              this.series_two[1][2].push(list[i].sumleaveearlycount);
              this.series_two[1][3].push(list[i].sumtruantcount);
            }
            this.isTwo = true;
          } else {
            this.chartData_one[0] = [];
            this.series_one[1][0] = [];
            this.series_one[1][1] = [];
            this.series_one[1][2] = [];
            this.series_one[1][3] = [];
            for (let i = 0; i < list.length; i++) {
              this.chartData_one[0].push(list[i].createtime);
              this.series_one[1][0].push(list[i].sumbelatecount);
              this.series_one[1][1].push(list[i].sumleavecount);
              this.series_one[1][2].push(list[i].sumleaveearlycount);
              this.series_one[1][3].push(list[i].sumtruantcount);
            }
            this.isOne = true;
          }
        }
      });
    },
    //统计健康异常数据
    initHealthTop(type) {
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        querytype: "1",
        sorttype: "5",
        page: "1",
        pagesize: "10",
      };
      mainServer.healthTop(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.abHealthTop;
          if (type == 1) {
            this.chartData_three[0] = [];
            this.series_three[1][0] = [];
            this.series_three[1][1] = [];
            this.series_three[1][2] = [];
            for (let i = 0; i < list.length; i++) {
              this.chartData_three[0].push(list[i].basename);
              this.series_three[1][0].push(list[i].sumtempecount);
              this.series_three[1][1].push(list[i].sumheartratecount);
              this.series_three[1][2].push(list[i].sumlessactivitycount);
            }
            this.isThree = true;
          } else {
            this.chartData_five[0] = [];
            this.indicator_five[0] = [];
            this.indicator_five[1] = [];
            this.indicator_five[2] = [];
            for (let i = 0; i < list.length; i++) {
              this.chartData_five[0].push(list[i].createtime);
              this.indicator_five[0].push(list[i].sumtempecount);
              this.indicator_five[1].push(list[i].sumheartratecount);
              this.indicator_five[2].push(list[i].sumlessactivitycount);
            }
            this.isFive = true;
          }
        }
      });
    },
    //初始化考勤异常数据汇总
    initSumTop() {
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        querytype: "3",
      };
      mainServer.sumTop(params).then((res) => {
        if (res.success) {
          this.attendanceInfo = res.resultMap.abnormalNums;
        }
      });
    },
    //初始化统计体温分布
    initStatisticsTemper() {
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
      };
      mainServer.statisticsTemper(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.temperDists;
          this.chartData_four[0][0] = list[0].tempecount39;
          this.chartData_four[0][1] = list[0].tempecount359;
          this.chartData_four[0][2] = list[0].tempecount372;
          this.chartData_four[0][3] = list[0].tempecount391;
          this.isFour = true;
        }
      });
    },
    //初始化考勤实时异常数据统计
    initStatisticsReal(number) {
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        page: number,
        pagesize: 10,
      };
      mainServer.statisticsRealAttend(params).then((res) => {
        if (res.success) {
          this.attendanceList = res.resultMap.realattends;
        }
      });
    },
    //初始化数据展示
    updateTime() {
      let cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2);
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
};
