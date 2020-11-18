<template>
  <div :id="id" class="chart" :style="{height:chartHeight,width:chartWidth}"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "line-chart",
  components: {},
  data() {
    return {
      id: this.generatorOnlyId(),
      chartHeight: "90%",
      chartWidth: "95%"
    };
  },
  props: {
    chartType: {
      type: String,
      default() {
        // 图表类型 line/bar/pie
        return "line";
      }
    },
    titleText: {
      type: String,
      default() {
        // 主标题
        return "title";
      }
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
      }
    },
    yText: {
      type: String,
      default() {
        // 纵轴文本
        return "y-text";
      }
    },
    chartData: {
      type: Array,
      default(){
        return []
      }
    },
    seriesData: {
      type: Array,
      default(){
        return []
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    xAxisData() {
      return this.chartData[0]
    },
    yAxisData() {
      return this.chartData[1]
    }
  },
  methods: {
    // 生成图表的唯一ID
    generatorOnlyId() {
      var that = this;
      return (
        Math.floor(Math.random() * 10000)
      );
    },
    // 生成渲染图表div的宽度与高度
    generatorWithAndHeight() {
      this.chartWidth = `${
        this.width ? this.width : this.chartWidth
      }`;
      this.chartHeight = `${
        this.height ? this.height : this.chartHeight
      }`;
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
          chart.setOption(this.generatorLineOption());
          break;
        case "bar":
          chart.setOption(this.generatorBarOption());
          break;
        case "pie":
          chart.setOption(this.generatorPieOption());
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
    generatorLineOption() {
      return {
        title: {
          text: this.titleText,
          x: "left",
          textStyle: {
                fontSize: 17,
                 fontWeight: 'bold',
                fontStyle: 'normal'
           }
        },
        legend: {
          data: this.configLengend(this.seriesData[0]),
          orient: "vertical",
          x: "right",
          y: "top",
          icon: "none",
          formatter:'——  {name}',
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "1%",
          bottom: "0",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            boundaryGap: true,
            splitLine: {show: false},
            axisTick:{
                 show:false
             }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {show: false},
            axisTick:{
                 show:false
             },
            min: 0,
            max: 45,
            splitNumber : 2,
          }
        ],
        series: this.configSeries(this.seriesData)
      };
    },
    //柱状配置
    generatorBarOption() {
      //判断是哪个柱状图
      let flag = this.seriesData[2];
      return {
        title: {
          text: this.titleText,
          x: "left",
          textStyle: {
                fontSize: 17,
                 fontWeight: 'bold',
                fontStyle: 'normal'
           }
        },
        legend: {
          data: this.configLengend(this.seriesData[0]),
          orient: "vertical",
          x: "right",
          y: "top",
          icon: "none",
          formatter:'——  {name}',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "1%",
          bottom: "0",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            splitLine: {show: false},
            axisTick:{
                 show:false
             },
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: flag === "1"?150:45,
            splitNumber : 2,
            axisTick:{
                 show:false
             },
             splitLine:{
                 show:false
             }
          }
        ],
        series: this.configSeries(this.seriesData)
      };
    },
    //配置legend
    configLengend(arr){
      let newLengend = []
      let colors = ["#057bfb"," #01edfb","#ed7d31","#fbdb27"]
      for(let i=0;i<arr.length;i++){
           newLengend.push({
              name: arr[i],
              textStyle: {
                  color: colors[i]
              }
          })
      }
      return newLengend;
    },
    //配置series
    configSeries(arr){
      let newSeries = []
      if(arr[2] !== "3"){
        for(let i=0;i<arr[0].length;i++){
           newSeries.push({
            name: arr[0][i],
            type: "bar",
            barWidth: arr[2] === "1"?"16":"32",
            barGap: "0",
            stack: arr[2] === "1"?NaN:"school",
            data: arr[1][i],
            itemStyle: {
               normal: {
                  //每根柱子颜色设置
                   color: function(params) {
                       return ["#057bfb","#01edfb","#ed7d31","#fbdb27"][params.seriesIndex];
                    },
                    label: {
                     show: true,
                     position: arr[2] === "1"?"top":"center",
                     textStyle: {	    //数值样式
                        color: 'black',
                        fontSize: 12
                     }
                    }
                }
            }
         })
       }
      }else{
        for(let i=0;i<arr[0].length;i++){
           newSeries.push({
            name: arr[0][i],
            type: "line",
            stack: "line",
            smooth: true,
            symbolSize: 3,
            itemStyle: {
               normal: {
                   //每根柱子颜色设置
                      color: function(params) {
                        return ["#057bfb","#01edfb","#ed7d31"][params.seriesIndex];
                      }
                }
            },
            color: ["#057bfb","#01edfb","#ed7d31"][i],
            data: arr[1][i]
         })
       }
      }
      return newSeries;
    },
    //饼图配置
    generatorPieOption() {
      let [pieData1,pieData2,pieData3] = [[],[],[]];
      let temperature = this.chartData.slice(0,1);
      let heartRate = this.chartData.slice(1,2);
      let poorActivity = this.chartData.slice(2,3);
      let legend = this.chartData.slice(-1);
      for(let i=0;i<temperature[0].length;i++){
          pieData1.push({
          value: temperature[0][i],
          name: legend[0][i]
        });
      }
      for(let i=0;i<heartRate[0].length;i++){
          pieData2.push({
          value: heartRate[0][i],
          name: legend[0][i]
        });
      }
      for(let i=0;i<poorActivity[0].length;i++){
          pieData3.push({
          value: poorActivity[0][i],
          name: legend[0][i]
        });
      }
      return {
        title: [
            {
                text: '当前健康异常学校TOP10',
                textStyle: {
                        fontSize: 17,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                }
            }, {
                subtext: '温度',
                left: '18.8%',
                top: '22%',
                textAlign: 'center',
                subtextStyle:{
                    fontSize: 15,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        color: "#111"
                }
            }, {
                subtext: '心率',
                left: '49%',
                top: '22%',
                textAlign: 'center',
                subtextStyle:{
                    fontSize: 15,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        color: "#111"
                }
            }, {
                subtext: '活动量差',
                left: '79.2%',
                top: '22%',
                textAlign: 'center',
                subtextStyle:{
                    fontSize: 15,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        color: "#111"
                }
            }
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
          textStyle: { //图例文字的样式
             color: '#111'
          }
        },
        series: [
         {
            type: 'pie',
            radius: 70,
            center: ['20%', '62%'],
            data: pieData1,
            label: {
                normal: {
                  position: 'inner',
                  show : false
                }
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
                       "#01edfb"
                      ];
                       return colorList[params.dataIndex];
                    }
                }
            }
        }, {
            type: 'pie',
            radius: 70,
            center: ['50%', '62%'],
            data: pieData2,
            label: {
                normal: {
                  position: 'inner',
                  show : false
                }
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
                       "#01edfb"
                      ];
                       return colorList[params.dataIndex];
                    }
                }
            }
        }, {
            type: 'pie',
            radius: 70,
            center: ['80%', '62%'],
            data: pieData3,
            label: {
                normal: {
                  position: 'inner',
                  show : false
                }
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
                       "#01edfb"
                      ];
                       return colorList[params.dataIndex];
                    }
                }
            }
         }
        ]
      };
    }
  },
  watch: {},
  mounted() {
    this.drawChart();
  },
  created() {
    this.generatorWithAndHeight();
  }
};
</script>