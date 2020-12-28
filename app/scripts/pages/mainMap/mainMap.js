import mapChart from "@/servers/map.server.js";
import roundCake from "@/servers/gauge.server.js";
import cityList from "@/util/chinaCity.json";
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapInit();
    this.random("showNum");
  },
  methods: {
    mapInit() {
      let options = {
        type: "map",
        barWidth: 22,
        isAxisLable: true,
        splitLine: true,
        boundaryGap: true,
        cityList: cityList,
        randomList: [],
      };
      let scrollMap = document.getElementById("scrollMap");
      mapChart(scrollMap, options);
    },
    //随机数
    random(str) {
      let colorList = [
        "",
        "#0094AC",
        "#A95F01",
        "#4C9EEA",
        "#065B4D",
        "#1AC8B5",
      ];
      for (let i = 1; i < 6; i++) {
        let canvasName = "canvasId";
        let id = str + "0" + i;
        canvasName = canvasName + "0" + i;
        let domId = document.getElementById(id);
        let canvasId = document.getElementById(canvasName);
        let showNum = Math.random() * (0.99 - 0.95) + 99.95;
        domId.innerText = showNum.toFixed(2);
        let options = {
          color: colorList[i],
          value: showNum,
        };
        roundCake(canvasId, options);
      }
    },
  },
};
