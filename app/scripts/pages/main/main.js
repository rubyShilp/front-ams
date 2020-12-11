import charts from "@/components/charts";
import * as mainServer from "./main.server.js";
import { formDate } from "@/util/core.js";
export default {
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      starttime: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      querytype: 1,
      isOne: false,
      isThree: false,
      isTwo: false,
      isFour: false,
      isFive: false,
      attendanceList: [], //考勤实时数据
      attendanceInfo: {}, //考勤异常数据汇总
      chartData_one: [[], []],
      series_one: [["迟到", "早退", "旷课", "请假"], [[],[],[],[]], "3"],
      chartData_two: [[], []],
      series_two: [["迟到", "早退", "旷课", "请假"], [[], [], [], []], "2"],
      chartData_three: [[], []],
      series_three: [["温度", "心率", "活动量差"], [[], [], []], "1"],
      chartData_four: [
        [],
        ["35.9°C以下", "36°C-37.2°C", "37°C-38°C", "38°C-39°C"],
      ],
      indicator_five: [[], [], [], ["温度", "心率", "活动量差"]],
      chartData_five: [[], [1000, 1000, 1000, 1000, 1000, 1000, 1000]],
      time: "",
      date: "",
      schoolcode: "",
      gradecode: "",
      classcode: "",
      schoolList: [], //所有学校信息
    };
  },
  beforeMount() {
    var timerID = setInterval(this.updateTime, 1000);
    // this.schoolcode = this.userInfo.roles[0].schoolcode;
    //this.gradecode=this.userInfo.roles[0].gradecode;
    //this.classcode=this.userInfo.roles[0].classcode;
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
          if(this.userInfo.userType === 2){
            this.schoolcode = this.schoolList[0].schoolcode;
         }else{
           this.schoolcode = "";
           this.schoolList.unshift({schoolcode: "",schoolname: "全部"})
         }
          this.initSumTop();
          this.initAttendTop(1);
          // this.initAttendTop(2);
          this.initHealthTop(1);
          // this.initHealthTop(2);
          this.initStatisticsTemper();
          this.initStatisticsReal(0);
        }
      });
    },
    clear() {
      this.chartData_one = [[], []];
      this.series_one = [["迟到", "早退", "旷课", "请假"], [[],[],[],[]], "3"];
      this.chartData_two = [[], []];
      this.series_two = [
        ["迟到", "早退", "旷课", "请假"],
        [[], [], [], []],
        "2",
      ];
      this.chartData_three = [[], []];
      this.series_three = [["温度", "心率", "活动量差"], [[], [], []], "1"];
      this.chartData_four = [
        [],
        ["35.9°C以下", "36°C-37.2°C", "37°C-38°C", "38°C-39°C"],
      ];
      this.indicator_five = [[], [], [], ["温度", "心率", "活动量差"]];
      this.chartData_five = [[], [1000, 1000, 1000, 1000, 1000, 1000, 1000]];
    },
    //选择学校查询信息
    selectSchool() {
      this.$nextTick(() => {
        this.clear();
        this.initSumTop();
        this.initAttendTop(1);
        // this.initAttendTop(2);
        this.initHealthTop(1);
        // this.initHealthTop(2);
        this.initStatisticsTemper();
        this.initStatisticsReal(0);
      });
    },
    //统计考勤异常数据
    initAttendTop() {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        gradecode: this.gradecode,
        classcode: this.classcode,
        querytype: this.querytype,
        sorttype: "1",
        page: 0,
        pagesize: "10",
      };
      mainServer.attendTop(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.abAttendTop;
          if(list.length !== 0){
              for (let i = 0; i < list.length; i++) {
                this.chartData_two[0].push(list[i].basename);
                this.series_two[1][0].push(list[i].sumbelatecount);
                this.series_two[1][1].push(list[i].sumleavecount);
                this.series_two[1][2].push(list[i].sumleaveearlycount);
                this.series_two[1][3].push(list[i].sumtruantcount);
                this.chartData_one[0].push(list[i].createtime);
                this.series_one[1][0].push(list[i].sumbelatecount);
                this.series_one[1][1].push(list[i].sumleavecount);
                this.series_one[1][2].push(list[i].sumleaveearlycount);
                this.series_one[1][3].push(list[i].sumtruantcount);
              }
          }else{
            this.$message({
              type: "error",
              message: "暂无图表数据"
            })
          }
        }
      });
    },
    //统计健康异常数据
    initHealthTop(type) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        gradecode: this.gradecode,
        classcode: this.classcode,
        querytype: this.querytype,
        sorttype: "1",
        page: 0,
        pagesize: "10",
      };
      mainServer.healthTop(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.abHealthTop;
          if(list.length !== 0){
              for (let i = 0; i < list.length; i++) {
                this.chartData_three[0].push(list[i].basename);
                this.series_three[1][0].push(list[i].sumtempecount);
                this.series_three[1][1].push(list[i].sumheartratecount);
                this.series_three[1][2].push(list[i].sumlessactivitycount);
                this.chartData_five[0].push(list[i].createtime);
                this.indicator_five[0].push(list[i].sumtempecount);
                this.indicator_five[1].push(list[i].sumheartratecount);
                this.indicator_five[2].push(list[i].sumlessactivitycount);
              }
          }else{
            this.$message({
              type: "error",
              message: "暂无图表数据"
            })
          }
        }
      });
    },
    //初始化考勤异常数据汇总
    initSumTop() {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        gradecode: this.gradecode,
        classcode: this.classcode,
        querytype: this.querytype,
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
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
      };
      mainServer.statisticsTemper(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.temperDists;
          if (list.length !== 0) {
            this.chartData_four[0][0] = list[0].tempecount39;
            this.chartData_four[0][1] = list[0].tempecount359;
            this.chartData_four[0][2] = list[0].tempecount372;
            this.chartData_four[0][3] = list[0].tempecount391;
            this.isFour = true;
          } else {
            this.$message({
              type: "error",
              message: "体温概括暂无图表数据"
            })
          }
        }
      });
    },
    //初始化考勤实时异常数据统计
    initStatisticsReal(number) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
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
