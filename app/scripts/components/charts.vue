<template>
  <div
    :id="id"
    class="chart"
    :style="{ height: chartHeight, width: chartWidth }"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "line-chart",
  components: {},
  data() {
    return {
      id: this.generatorOnlyId(),
      chartHeight: this.theme === "main" ? "95%" : "90%",
      chartWidth: "95%",
    };
  },
  props: {
    chartType: {
      type: String,
      default() {
        // 图表类型 line/bar/pie
        return "line";
      },
    },
    titleText: {
      type: String,
      default() {
        // 主标题
        return "title";
      },
    },
    // subText: {
    //   type: String,
    //   default() {
    //     // 次级标题
    //     return "sub-text";
    //   }
    // },
    xText: {
      type: String,
      default() {
        // 横轴文本
        return "x-text";
      },
    },
    yText: {
      type: String,
      default() {
        // 纵轴文本
        return "y-text";
      },
    },
    chartData: {
      type: Array,
      default() {
        return [];
      },
    },
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
    indicatorData: {
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    //主题
    theme: {
      type: String,
      default: "",
    },
    h5: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    xAxisData() {
      return this.chartData[0];
    },
    yAxisData() {
      return this.chartData[1];
    },
  },
  methods: {
    // 生成图表的唯一ID
    generatorOnlyId() {
      var that = this;
      return Math.floor(Math.random() * 10000);
    },
    // 生成渲染图表div的宽度与高度
    generatorWithAndHeight() {
      this.chartWidth = `${this.width ? this.width : this.chartWidth}`;
      this.chartHeight = `${this.height ? this.height : this.chartHeight}`;
    },
    // 绘制图表
    drawChart() {
      let chart = echarts.init(document.getElementById(this.id));
      if (chart == undefined) {
        console.error(`echarts init dom id ${this.id} failed`);
        return;
      }
      switch (this.chartType) {
        case "line":
          chart.setOption(this.generatorLineOption(this.seriesData[1]));
          break;
        case "bar":
          chart.setOption(this.generatorBarOption(this.seriesData[1]));
          break;
        case "pie":
          chart.setOption(this.generatorPieOption());
          break;
        case "radar":
          chart.setOption(this.generatorRadaOption());
          break;
        default:
          console.error(`chartType ${this.chartType} is invalid`);
          break;
      }
      let self = this;
      let work = null;
      window.addEventListener("resize", function() {
        self.generatorWithAndHeight();
        if (work == null) {
          work = setTimeout(function() {
            chart.resize();
            work = null;
          }, 100);
        }
      });
    },
    //折线配置
    generatorLineOption(arr) {
      return {
        title: {
          text: this.titleText,
          x: "10px",
          y: "10px",
          textStyle: {
            fontSize: 17,
            fontWeight: "bold",
            fontStyle: "normal",
            color: this.theme === "main" ? "#2991d0" : "#111",
          },
        },
        legend: {
          data: this.configLengend(this.seriesData[0]),
          orient: "vertical",
          x: "right",
          y: this.theme === "main" ? "10px" : "top",
          icon: "none",
          formatter: "——  {name}",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "1%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            boundaryGap: true,
            splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLine:
              this.theme === "main"
                ? {
                    lineStyle: {
                      color: "#fff",
                      width: 1, //这里是为了突出显示加上的
                    },
                  }
                : {
                    lineStyle: {
                      color: "#cccccc",
                      width: 1, //这里是为了突出显示加上的
                    },
                  },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLine:
              this.theme === "main"
                ? {
                    lineStyle: {
                      color: "#fff",
                      width: 1, //这里是为了突出显示加上的
                    },
                  }
                : {
                    lineStyle: {
                      color: "#cccccc",
                      width: 1, //这里是为了突出显示加上的
                    },
                  },
            min: 0,
            max: function(){
              let newArr = [];
              let MAX = 0;
              for(let i=0;i<arr.length;i++){
                 for(let j=0;j<arr[i].length;j++){
                    newArr.push(arr[i][j])
                 }
              }
              MAX = Math.max(...newArr)+100;
              return MAX;
            },
            splitNumber: 3,
          },
        ],
        series: this.configSeries(this.seriesData),
      };
    },
    //柱状配置
    generatorBarOption(arr) {
      let route = 0;
      //判断是哪个柱状图
      let flag = this.seriesData[2];
      return {
        title: {
          text: this.titleText,
          x: "10px",
          y: "10px",
          textStyle: {
            fontSize: 17,
            fontWeight: "bold",
            fontStyle: "normal",
            color: this.theme === "main" ? "#2991d0" : "#111",
          },
        },
        legend: {
          data: this.configLengend(this.seriesData[0]),
          orient: "vertical",
          x: "right",
          y: this.theme === "main" ? "10px" : "top",
          icon: "none",
          formatter: "——  {name}",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              // 阴影指示器样式设置
              width: "20px", // 阴影大小
              color: "rgba(150,150,150,0.2)", // 阴影颜色
            },
          },
        },
        grid: {
          left: "3%",
          right: "1%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            splitLine: { show: false },
            axisTick: {
              show: false,
            },

            axisLabel: {
              interval: 0, //代表显示所有x轴标签显示
              rotate: route = this.chartData[0].length>5 ? 45: 0,
            },
            axisLine:
              this.theme === "main"
                ? {
                    lineStyle: {
                      color: "#fff",
                      width: 1, //这里是为了突出显示加上的
                    },
                  }
                : {
                    lineStyle: {
                      color: "#cccccc",
                      width: 1, //这里是为了突出显示加上的
                    },
                  },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: function(){
              let newArr = [];
              let MAX = 0;
              for(let i=0;i<arr.length;i++){
                 for(let j=0;j<arr[i].length;j++){
                    newArr.push(arr[i][j])
                 }
              }
              MAX = Math.max(...newArr)+100;
              return MAX;
            },
            splitNumber: 2,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine:
              this.theme === "main"
                ? {
                    lineStyle: {
                      color: "#fff",
                      width: 1, //这里是为了突出显示加上的
                    },
                  }
                : {
                    lineStyle: {
                      color: "#cccccc",
                      width: 1, //这里是为了突出显示加上的
                    },
                  },
          },
        ],
        series: this.configSeries(this.seriesData),
      };
    },
    //配置legend
    configLengend(arr) {
      let newLengend = [];
      let colors = [];
      colors =
        this.chartType === "radar"
          ? ["#66CCFF", "#057bfb", "#fbdb27"]
          : ["#057bfb", " #01edfb", "#ed7d31", "#fbdb27"];
      for (let i = 0; i < arr.length; i++) {
        newLengend.push({
          name: arr[i],
          textStyle: {
            color: colors[i],
          },
        });
      }
      return newLengend;
    },
    //配置series
    configSeries(arr) {
      let newSeries = [];
      if (arr[2] !== "3") {
        for (let i = 0; i < arr[0].length; i++) {
          newSeries.push({
            name: arr[0][i],
            type: "bar",
            barWidth:
              this.theme === "main"
                ? arr[2] === "1"
                  ? "10"
                  : "22"
                : arr[2] === "1"
                ? this.h5
                  ? "8"
                  : "12"
                : this.h5
                ? "15"
                : "30",
            barGap: "0",
            stack: arr[2] === "1" ? NaN : "school",
            data: arr[1][i],
            itemStyle: {
              normal: {
                barBorderRadius:
                  this.theme === "main" ? (arr[2] === "1" ? 8 : 0) : 0,
                //每根柱子颜色设置
                color: function(params) {
                  return ["#057bfb", "#01edfb", "#ed7d31", "#fbdb27"][
                    params.seriesIndex
                  ];
                },
                label: {
                  show: true,
                  position: arr[2] === "1" ? "top" : "center",
                  textStyle: {
                    //数值样式
                    color: this.theme === "main" ? "#fff" : "black",
                    fontSize: 12,
                  },
                },
              },
            },
          });
        }
      } else {
        for (let i = 0; i < arr[0].length; i++) {
          newSeries.push({
            name: arr[0][i],
            type: "line",
            smooth: true,
            symbolSize: 3,
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function(params) {
                  let color = ["#057bfb", "#01edfb", "#ed7d31", "#fbdb27"][params.seriesIndex];;
                  return  color;
                },
              },
            },
            color: ["#057bfb", "#01edfb", "#ed7d31", "#fbdb27"][i],
            data: arr[1][i],
          });
        }
      }
      return newSeries;
    },
    //饼图配置
    generatorPieOption() {
      if (this.theme == "main") {
        let pieData = [];
        for (let index in this.xAxisData) {
          pieData.push({
            value: this.xAxisData[index],
            name: this.yAxisData[index],
          });
        }
        return {
          title: {
            text: this.titleText,
            x: "10px",
            y: "10px",
            textStyle: {
              fontSize: 17,
              fontWeight: "bold",
              fontStyle: "normal",
              color: "#2991d0",
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            data: this.yAxisData,
            orient: "vertical",
            left: 20,
            bottom: 0,
            icon: "rect",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: {
              //图例文字的样式
              color: "#fff",
            },
          },
          series: [
            {
              name: "体温概括",
              type: "pie",
              radius: ["30%", "80%"],
              center: ["57%", "52%"],
              data: pieData,
              label: {
                //饼图图形上的文本标签
                normal: {
                  show: true,
                  position: "inner", //标签的位置
                  textStyle: {
                    fontWeight: 300,
                    fontSize: 12, //文字的字体大小
                    color: "#111",
                  },
                  formatter: "{c}",
                },
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = ["#fbdb27", "#01edfb", "#ed7d31", "#ccc"];
                    return colorList[params.dataIndex];
                  },
                },
              },
            },
          ],
        };
      } else if(this.theme === "static") {
          let pieData = [];
        for (let index in this.xAxisData) {
          pieData.push({
            value: this.xAxisData[index],
            name: this.yAxisData[index],
          });
        }
        return {
          tooltip: {
            // trigger: "item",
            // formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            data: this.yAxisData,
           orient: "horizontal",
            x: "center",
            y: "bottom",
            icon: "rect",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: {
              //图例文字的样式
              color: "#111",
            },
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: "75%",
              center: ["40%", "42%"],
              data: pieData,
              label: {
                //饼图图形上的文本标签
                normal: {
                  show: true,
                  position: "inner", //标签的位置
                  textStyle: {
                    fontWeight: 300,
                    fontSize: 12, //文字的字体大小
                    color: "#111",
                  },
                  formatter: "{c}",
                },
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#057bfb",
                      "#fbdb27",
                      "#f3f3f3",
                      "#ed7d31",
                      "#276ef9",
                      "#08a21d",
                      "#01edfb",];
                    return colorList[params.dataIndex];
                  },
                },
              },
            },
          ],
        };
      }else{
        let [pieData1, pieData2, pieData3] = [[], [], []];
        let temperature = this.chartData.slice(0, 1);
        let heartRate = this.chartData.slice(1, 2);
        let poorActivity = this.chartData.slice(2, 3);
        let legend = this.chartData.slice(-1);
        for (let i = 0; i < temperature[0].length; i++) {
          pieData1.push({
            value: temperature[0][i],
            name: legend[0][i],
          });
        }
        for (let i = 0; i < heartRate[0].length; i++) {
          pieData2.push({
            value: heartRate[0][i],
            name: legend[0][i],
          });
        }
        for (let i = 0; i < poorActivity[0].length; i++) {
          pieData3.push({
            value: poorActivity[0][i],
            name: legend[0][i],
          });
        }
        return {
          title: [
            {
              text: "当前健康异常学校TOP10",
              textStyle: {
                fontSize: 17,
                fontWeight: "bold",
                fontStyle: "normal",
              },
            },
            {
              subtext: "温度",
              left: "18.8%",
              top: "22%",
              textAlign: "center",
              subtextStyle: {
                fontSize: 15,
                fontWeight: "bold",
                fontStyle: "normal",
                color: "#111",
              },
            },
            {
              subtext: "心率",
              left: "49%",
              top: "22%",
              textAlign: "center",
              subtextStyle: {
                fontSize: 15,
                fontWeight: "bold",
                fontStyle: "normal",
                color: "#111",
              },
            },
            {
              subtext: "活动量差",
              left: "79.2%",
              top: "22%",
              textAlign: "center",
              subtextStyle: {
                fontSize: 15,
                fontWeight: "bold",
                fontStyle: "normal",
                color: "#111",
              },
            },
          ],
          tooltip: {
            // trigger: "item",
            // formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            data: legend[0],
            orient: "horizontal",
            x: "center",
            y: "bottom",
            icon: "rect",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: {
              //图例文字的样式
              color: "#111",
            },
          },
          series: [
            {
              type: "pie",
              radius: 70,
              center: ["20%", "62%"],
              data: pieData1,
              label: {
                normal: {
                  position: "inner",
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#057bfb",
                      "#fbdb27",
                      "#f3f3f3",
                      "#ed7d31",
                      "#276ef9",
                      "#08a21d",
                      "#01edfb",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
            },
            {
              type: "pie",
              radius: 70,
              center: ["50%", "62%"],
              data: pieData2,
              label: {
                normal: {
                  position: "inner",
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#057bfb",
                      "#fbdb27",
                      "#f3f3f3",
                      "#ed7d31",
                      "#276ef9",
                      "#08a21d",
                      "#01edfb",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
            },
            {
              type: "pie",
              radius: 70,
              center: ["80%", "62%"],
              data: pieData3,
              label: {
                normal: {
                  position: "inner",
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#057bfb",
                      "#fbdb27",
                      "#f3f3f3",
                      "#ed7d31",
                      "#276ef9",
                      "#08a21d",
                      "#01edfb",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
            },
          ],
        };
      }
    },
    //雷达图配置
    generatorRadaOption() {
      let indData = [];
      for (let index in this.xAxisData) {
        indData.push({
          name: this.xAxisData[index],
          max: this.yAxisData[index],
        });
      }
      return {
        title: {
          text: this.titleText,
          x: "10px",
          y: "10px",
          textStyle: {
            fontSize: 17,
            fontWeight: "bold",
            fontStyle: "normal",
            color: "#2991d0",
          },
        },
        tooltip: {},
        legend: {
          data: this.configLengend(
            this.indicatorData[this.indicatorData.length - 1]
          ),
          orient: "vertical",
          left: 0,
          bottom: 0,
          icon: "none",
          formatter: "——  {name}",
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
            },
          },
          center: ["56%", "50%"],
          indicator: indData,
          splitArea: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#286fbb", // 图表背景网格线的颜色
            },
          },
          axisLine: {
            // (圆内的几条直线)坐标轴轴线相关设置
            lineStyle: {
              width: 0,
            },
          },
        },
        series: [
          {
            name: "考勤异常",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: this.indicatorData[0],
                name: this.indicatorData[this.indicatorData.length - 1][0],
                lineStyle: {
                  color: "rgb(128, 128, 128,0)", // 将线设置成透明
                },
                areaStyle: {
                  color: "#66CCFF", // 最浅
                },
                symbol: "none",
              },
              {
                value: this.indicatorData[1],
                name: this.indicatorData[this.indicatorData.length - 1][1],
                lineStyle: {
                  color: "rgb(128, 128, 128,0)", // 将线设置成透明
                },
                areaStyle: {
                  color: "#057bfb", // 最浅
                },
                symbol: "none",
              },
              {
                value: this.indicatorData[2],
                name: this.indicatorData[this.indicatorData.length - 1][2],
                lineStyle: {
                  color: "rgb(128, 128, 128,0)", // 将线设置成透明
                },
                areaStyle: {
                  color: "#fbdb27", // 最浅
                },
                symbol: "none",
              },
            ],
          },
        ],
      };
    },
  },
  watch: {},
  mounted() {
    this.drawChart();
  },
  created() {
    this.generatorWithAndHeight();
  },
};
</script>
