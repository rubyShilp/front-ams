import echarts from "@/util/echarts.js";
export default (el, options) => {
  const chartInstance = echarts.init(el);
  var option = {
    title: {
      text: options.title,
      textStyle: {
        fontWeight: "normal",
        color: "#2991d0",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      x: 45,
      y: 40,
      x2: 40,
      y2: 35,
    },
    legend: {
      data: options.legendData,
      orient: "vertical",
      x: "right",
      y: "top",
      icon: "none",
      formatter: "——  {name}",
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: options.chartData,
        splitLine: { show: false },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            fontWeight: "normal",
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 150,
        splitNumber: 3,
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 1,
          },
        },
      },
    ],
    series: options.seriesData,
  };
  chartInstance.setOption(option);
  return chartInstance;
};
