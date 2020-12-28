import mapChart from "@/servers/map.server.js";
import cityList from "@/util/chinaCity.json";
import * as mainMap from './mainMap.server.js';
export default {
  data() {
    return {
      provinceList:[],//省数据
      cityList:[],
      attendanceInfo:{}
    };
  },
  mounted() {
    this.mapInit();
    this.initProvcode();
    //this.initCity();
  },
  methods: {
    //获取当前省份数据
    initProvcode(){
      mainMap.getAllProvinces().then(res=>{
        if(res.success){
          this.provinceList=res.resultMap.options;
        }
      })
    },
    //获取当前市区数据
    initCity(){
      let params={provcode:''}
      mainMap.getAllCitysByProvcode(params).then(res=>{
        if(res.success){

        }
      })
    },
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
  },
};
