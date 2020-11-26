import charts from "@/components/charts";
import * as mainServer from "./main.server.js";
export default {
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      attendanceList: [], //考勤实时数据
      chartData_one: [
        ["03/01", "03/02", "03/03", "03/04", "03/05", "03/06", "03/07"],
        [0, 5, 10, 15],
      ],
      series_one: [
        ["迟到", "早退", "旷课", "请假"],
        [
          [15, 20, 25, 17, 20, 12, 0],
          [3, 5, 4, 6, 5, 2, 0],
          [3, 5, 4, 6, 5, 2, 0],
          [4, 7, 4, 6, 5, 2, 0],
        ],
        "3",
      ],
      chartData_two: [
        [
          "实验小学",
          "实验二小",
          "实验三小",
          "实验四小",
          "龙岗小学",
          "龙华小学",
          "南山小学",
          "宝安小学",
          "光明小学",
        ],
        [0, 5, 10, 15],
      ],
      series_two: [
        ["迟到", "早退", "旷课", "请假"],
        [
          [15, 20, 25, 17, 20, 12, 20, 22, 17],
          [3, 5, 4, 6, 5, 2, 5, 4, 2],
          [3, 5, 4, 6, 5, 2, 7, 5, 2],
          [2, 4, 7, 3, 4, 1, 8, 2, 4],
        ],
        "2",
      ],
      chartData_three: [
        [
          "实验小学",
          "实验二小",
          "实验三小",
          "实验四小",
          "龙岗小学",
          "龙华小学",
          "南山小学",
          "宝安小学",
          "光明小学",
        ],
        [0, 50, 100, 150],
      ],
      series_three: [
        ["温度", "心率", "活动量差"],
        [
          [125, 125, 125, 125, 125, 125, 125, 125, 125],
          [85, 85, 85, 85, 85, 85, 85, 85, 85],
          [65, 65, 65, 65, 65, 65, 65, 65, 65],
        ],
        "1",
      ],
      chartData_four: [
        [48, 80, 60, 40],
        ["35.9°C以下", "36°C-37.2°C", "37°C-38°C", "38°C-39°C"],
      ],
      indicator_five: [
        [65, 70, 80, 50, 50, 90, 100],
        [80, 64, 58, 41, 42, 41, 42],
        [40, 52, 65, 66, 70, 80, 90],
        ["温度", "心率", "活动量差"],
      ],
      chartData_five: [
        ["12/7", "12/6", "12/5", "12/4", "12/3", "12/2", "12/1"],
        [100, 100, 100, 100, 100, 100, 100],
      ],
      time: "",
      date: "",
    };
  },
  beforeMount() {
    var timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
    //this.initAttendTop();
    this.initHealthTop();
  },
  methods: {
    //统计考勤异常数据
    initAttendTop() {
      let params = {
        schoolcode: "WXND8911111",
        starttime: "2020-11-10 00:00:00",
        endtime: "2020-11-20 23:59:59",
      };
      mainServer.attendTop(params).then((res) => {
        if (res.success) {
        }
      });
    },
    //统计健康异常数据
    initHealthTop() {
      let params = {
        starttime: "2020-11-10 00:00:00",
        endtime: "2020-11-20 23:59:59",
        schoolcode: "",
        querytype: "1",
        sorttype: "5",
        page: "1",
        pagesize: "10",
      };
      mainServer.healthTop(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.abHealthTop;
          for (let i = 0; i < list.length; i++) {
            this.chartData_three[0].push(list[i].basename);
            this.series_three[1][0].push(list[i].sumtempecount);
            this.series_three[1][1].push(list[i].sumheartratecount);
            this.series_three[1][2].push(list[i].sumlessactivitycount);
          }
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
