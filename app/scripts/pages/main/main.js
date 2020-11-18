import charts from "@/components/linBarCharts/linBarCharts.vue";
export default {
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      attendanceList: [], //考勤实时数据
      chartData: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7"],
      legendData: ["迟到", "早退", "旷课", "请假"],
      seriesData: [
        [34, 12, 22, 23, 21, 22, 33],
        [1, 23, 45, 23, 6, 2, 3],
        [12, 33, 23, 25, 34, 54, 44],
        [2, 3, 4, 5, 6, 21, 34],
      ],
    };
  },
  methods: {
    //初始化数据展示
  },
};
