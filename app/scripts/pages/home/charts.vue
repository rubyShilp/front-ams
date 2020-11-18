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
      default() {
        // 图表数据
        return [];
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
          data: '——' + this.legendText
        },
        xAxis: {
          type: "category",
          axisTick:{
                 show:false
             },
          data: this.xAxisData
        },
        yAxis: {
          type: "value",
          axisTick:{
                 show:false
             },
             splitLine:{
                 show:false
             }
        },
        series: [
          {
            data: this.yAxisData,
            type: "line"
          }
        ]
      };
    },
    //柱状配置
    generatorBarOption() {
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
            max: 150,
            splitNumber : 3,
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
    console.log(arr)
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
      for(let i=0;i<arr[0].length;i++){
           newSeries.push({
            name: arr[0][i],
            type: "bar",
            barWidth: "16",
            barGap: "0",
            data: arr[1][i],
            itemStyle: {
               normal: {
                  //每根柱子颜色设置
                   color: function(params) {
                     let colorList = [
                       "#057bfb",
                       "#01edfb",
                       "#ed7d31",
                        "#fbdb27"
                      ];
                      console.log(colorList[params.seriesIndex])
                       return colorList[params.seriesIndex];
                    },
                    label: {
                     show: true,
                     position: 'top',
                     textStyle: {	    //数值样式
                        color: 'black',
                        fontSize: 12
                     }
                    }
                }
            }
         })
      }
      return newSeries;
    },
    //饼图配置
    generatorPieOption() {
      let pieData = [];
      for (let index in this.xAxisData) {
        pieData.push({
          value: this.yAxisData[index],
          name: this.xAxisData[index]
        });
      }
      return {
        title: {
          text: this.titleText,
          x: "left",
          textStyle: {
                fontSize: 17,
                 fontWeight: 'bold',
                fontStyle: 'normal',
           }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.xAxisData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
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