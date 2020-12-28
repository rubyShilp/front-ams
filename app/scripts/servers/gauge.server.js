import echarts from "../util/echarts";
export default (el, options) => {
  const chartInstance = echarts.init(el);
  let option = {
    axisLabel: {
      textStyle: {
        // 属性lineStyle控制线条样式
        color: "#000",
        fontSize: 9, //改变仪表盘内刻度数字的大小
        shadowColor: "#000", //默认透明
      },
    },
    pointer: {
      width: 3, //指针的宽度
      length: "60%", //指针长度，按照半圆半径的百分比
      shadowColor: "#ccc", //默认透明
      shadowBlur: 5,
    },
    axisTick: {
      show: false,
    },
    series: [
      {
        type: "gauge",
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: "100%",
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            width: 2,
            color: [[1, options.color]],
          },
          textStyle: {
            color: "#fff",
          },
        },

        axisTick: {
          // 坐标轴小标记
          length: 8, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto",
          },
          textStyle: {
            color: "#fff",
          },
        },
        splitNumber: "none",
        splitLine: {
          show: false,
          // 分隔线
          length: 8, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            color: "#fff",
          },
          textStyle: {
            color: "#fff",
          },
        },
        detail: {
          show: false,
          fontWeight: "bolder",
          borderRadius: 3,
          formatter: "{value}%",
          fontSize: 12,
          offsetCenter: ["0", "15"],
        },
        pointer: {
          width: 2,
        },
        title: {
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: "#fff",
            fontSize: 12,
            show: false,
          },
        },
        data: [{ value: options.value, name: "" }],
      },
    ],
  };
  chartInstance.setOption(option);
};
