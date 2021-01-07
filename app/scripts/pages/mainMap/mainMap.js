import mapChart from "@/servers/map.server.js";
import cityList from "@/util/chinaCity.json";
import { formDate } from "@/util/core.js";
import * as mainMap from "./mainMap.server.js";
export default {
  data() {
    return {
      provinceList: [], //省数据
      cityList: [],
      attendanceInfo: {},
      randomList: [],
      starttime: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
    };
  },
  mounted() {
    this.initProvcode();
    this.initMapStudent();
    setInterval(() => {
      this.initProvcode();
      this.initMapStudent();
    }, 2 * 60 * 1000);
  },
  methods: {
    //获取当前省份数据
    initProvcode() {
      let params = {
        starttime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
      };
      mainMap.getAllRecordSum(params).then((res) => {
        if (res.success) {
          this.attendanceInfo = res.resultMap.provincesum;
        }
      });
    },
    //获取全国市区人员信息
    initMapStudent() {
      let params = {
        starttime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
      };
      mainMap.getCityAttendRecords(params).then((res) => {
        if (res.success) {
          let list = res.resultMap.cities;
          let mapList = [];
          for (let value in cityList) {
            for (let i = 0; i < list.length; i++) {
              if (value === list[i].cityname) {
                mapList.push({
                  name: value,
                  value: cityList[value],
                });
              }
            }
          }
          let itemList = [];
          let data = mapList.sort((a, b) => {
            return b.value - a.value;
          });
          let index = Math.round(Math.random() * data.length);
          for (let i = 0; i < index; i++) {
            itemList.push(data[i]);
          }
          this.mapInit(mapList, itemList);
        }
      });
    },
    mapInit(cityList, itemList) {
      let options = {
        type: "map",
        barWidth: 22,
        isAxisLable: true,
        splitLine: true,
        boundaryGap: true,
        cityList: cityList,
        randomList: itemList,
      };
      let scrollMap = document.getElementById("scrollMap");
      mapChart(scrollMap, options);
    },
    login() {
      this.$router.push("/login");
    },
  },
};
