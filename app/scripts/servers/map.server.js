import echarts from "../util/echarts";
import "echarts/map/js/china.js";
export default (el, options) => {
  const mapChart = echarts.init(el);
  let optionMap = {
    title: {
      padding: [25, 0, 0, 0],
      text: "学生运动轨迹",
      textStyle: {
        color: "rgba(160,185,237,1)",
        fontSize: 14,
      },
    },
    geo: {
      map: "china",
      hoverable: false,
      label: {
        emphasis: {
          //动态展示的样式
          color: "#fff",
        },
      },
      itemStyle: {
        normal: {
          areaColor: "rgba(11,27,114,1)",
          borderColor: "#10C8E6",
        },
        emphasis: {
          color: "#4f87fb",
          areaColor: "#069",
          fontSize: "14px",
        },
      },
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "geo",
        data: options.cityList,
        symbolSize: 6,
        itemStyle: {
          color: "#10C8E6",
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        hoverAnimation: true,
        itemStyle: {
          color: "#10C8E6",
        },
        data: options.randomList,
        symbolSize: 20,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
      },
    ],
  };
  mapChart.setOption(optionMap);
};
