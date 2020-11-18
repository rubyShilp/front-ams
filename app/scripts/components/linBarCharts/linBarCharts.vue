<template>
  <div
    :id="id"
    class="chart"
    style="width:98%;height:95%;margin-top:12px"
  ></div>
</template>
<script>
import line from "@/servers/lineServer";
export default {
  data() {
    return {
      id: this.generatorOnlyId(),
      chartHeight: "90%",
      chartWidth: "95%",
      colors: ["#ed7d31", "#01edfb", "#057bfb", "#fbdb27"],
    };
  },
  props: {
    chartType: {
      type: String,
      default: "line",
    },
    title: {
      type: String,
      default: "默认图表",
    },
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
    legendData: {
      type: Array,
      default() {
        return [];
      },
    },
    chartData: {
      type: Array,
      default() {
        // 图表数据
        return [];
      },
    },
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 生成图表的唯一ID
    generatorOnlyId() {
      var that = this;
      return Math.floor(Math.random() * 10000);
    },
    configLengend(arr) {
      let newLengend = [];
      for (let i = 0; i < arr.length; i++) {
        newLengend.push({
          name: arr[i],
          textStyle: {
            color: this.colors[i],
          },
        });
      }
      return newLengend;
    },
    initChart() {
      let options = {
        title: this.title,
        chartData: this.chartData,
        legendData: this.configLengend(this.legendData),
        seriesData: [],
      };
      for (let i = 0; i < this.seriesData.length; i++) {
        options.seriesData.push({
          name: this.legendData[i],
          type: this.chartType,
          data: this.seriesData[i],
          itemStyle: {
            normal: {
              color: this.colors[i], //改变折线点的颜色
              lineStyle: {
                color: this.colors[i], //改变折线颜色
              },
            },
          },
        });
      }
      let dom = document.getElementById(this.id);
      line(dom, options);
    },
  },
};
</script>
