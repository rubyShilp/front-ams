import info from "@/util/chinamap.js";
import { getCityProvince,getProvAttendSum,getAllProvinces,getCityAttendRecords,getProvAttendRecords,getCityAttendRecordSum } from "./h5mainMap.server";
import { formDate } from "@/util/core.js";
import echarts from "echarts";
import { Divider } from "element-ui";
require("echarts/lib/chart/map");
require("echarts/map/js/china");

export default{
    name: "mapChart",
    data() {
        return {
          chinaSum: {},
          starttime:new Date(),
          endtime:new Date(),
          cityList: [],
          //省份数据值
          prodata: [],
          regions: [],
          type: 1,
          title: "全国考勤健康情况"
        };
    },  
    mounted() {
      this.initquery(1)
    },
    methods: {
      initquery(type,procode,mapType){
        this.type = type
        if(type === 1){           //省级颜色配置
          this.title = "全国考勤健康情况"
          this.getProvAttendRecordSum();
          let params = {
            starttime:  formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
            endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss")
          }
          getProvAttendRecords(params).then(res=>{
            if(res.success){
              [...this.regions] = this.getRegions(res.resultMap.provinces,1)
              this.mapChart('china');
              // 初始化加载
              getAllProvinces({}).then(res=>{
               if(res.success){
                 this.prodata=[];
                 let list = res.resultMap.options
                 for(let i=0;i<list.length;i++){
                  this.prodata.push({
                    name:  list[i].label,
                    value: parseInt(list[i].value)
                  })
                }
                this.mapChart('china');
               }
              })
            }
          })
        }else if(type === 2){     //市级颜色配置
          let params = {
            starttime:  formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
            endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
            provcode: procode
          }
          getCityAttendRecords(params).then(res=>{
            if(res.success){
              [...this.regions] = this.getRegions(res.resultMap.cities,2)
              this.mapChart(mapType);
            }
          })
        }
      },
      //配置初始背景色
      getRegions(colorArr,type){
        let newArr = [];
        console.log(colorArr)
        for(let i=0;i<colorArr.length;i++){
          console.log((type === 1?colorArr[i].provname:colorArr[i].cityname).substr(0,(type === 1?colorArr[i].provname:colorArr[i].cityname).length-1))
          if(colorArr[i].count <= 0){
            newArr.push({
              name: (type === 1?colorArr[i].provname.substr(0,colorArr[i].provname.length-1):colorArr[i].cityname),
              value:colorArr[i].count,
              info:colorArr[i],
              itemStyle: {
               areaColor: "#fff",
               opacity: 0.2                            
              }
           })
          }else if(colorArr[i].count>=0 && colorArr[i].count<=9){
            newArr.push({
              name: (type === 1?colorArr[i].provname.substr(0,colorArr[i].provname.length-1):colorArr[i].cityname),
              value:colorArr[i].count,
              info:colorArr[i],
              itemStyle: {
               areaColor: "#fcc",
               opacity: 0.2                            
              }
           }) 
          }else if(colorArr[i].count>=10 && colorArr[i].count<=49){
            newArr.push({
              name: (type === 1?colorArr[i].provname.substr(0,colorArr[i].provname.length-1):colorArr[i].cityname),
              value:colorArr[i].count,
              info:colorArr[i],
              itemStyle: {
               areaColor: "#f99",
               opacity: 0.2                            
              }
           }) 
          }else if(colorArr[i].count>=50 && colorArr[i].count<=99){
            newArr.push({
              name: (type === 1?colorArr[i].provname.substr(0,colorArr[i].provname.length-1):colorArr[i].cityname),
              value:colorArr[i].count,
              info:colorArr[i],
              itemStyle: {
               areaColor: "#f66",
               opacity: 0.2                            
              }
           }) 
          }else{
            newArr.push({
              name: (type === 1?colorArr[i].provname.substr(0,colorArr[i].provname.length-1):colorArr[i].cityname),
              value:colorArr[i].count,
              info:colorArr[i],
              itemStyle: {
               areaColor: "#f33",
               opacity: 0.2                            
              }
           }) 
          }
        }
        return newArr;
      },
      //查询省份和市区信息
      getProvcity(){
        var that = this;
        getAllProvinces({}).then(res=>{
         if(res.success){
           this.prodata=[];
           let list = res.resultMap.options
           for(let i=0;i<list.length;i++){
            that.prodata.push({
              name:  list[i].label,
              value: parseInt(list[i].value)
            })
          }
         }
        })
      },
      //查询全国考勤异常汇总
      getProvAttendRecordSum(){
        let parmas = {
          starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
          endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss")
        }
        getProvAttendSum(parmas).then(res=>{
           if(res.success){
             this.chinaSum = Object.assign({},res.resultMap.provincesum)
           }
        })
      },
        // 返回全国视图
      backMap() {
        this.initquery(1)
      },
       // 配置渲染map
    mapChart(map) {
        let myChart = echarts.init(document.getElementById("container"));
        window.addEventListener("resize", ()=>{
          myChart.resize();
        });
        let option = {
          //backgroundColor:'#eaeaea',
          geo: {
            map: map,
            roam: false,
            //图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              // emphasis: { // 选中板块的配置，api与normal相同
              //   show: true, // 是否显示文本
              //   color: '#fff',
              // },
              normal: {
                show: true,
                fontSize: "7",
                fontWeight: 'bold',
                color: "#000"
              }
            },
            //初始各板块颜色设置
            itemStyle: { // 选中板块配置
              normal: { // 初始样式
                  areaColor: "#fff", // 地图颜色
                  borderColor: '#A9A9A9', //线条颜色
                  borderType: 'solid', //边框样式
                  opacity: '.8'
              },
              emphasis: { //选中后
                  areaColor: '#87CEEB' //鼠标移入颜色
              }
            },
            regions: this.prodata //地图上每个省份标不同颜色
          },
          //鼠标移上提示框
          tooltip: {
            trigger: 'item',
            formatter: function(data){
              let v=data.data;
              let html ='';
              if(v){
                html=`<div style="color: #fff;font-size: 14px;line-height: 24px;padding:0;">
                  <p style="font-size: 14px;margin:0 5px">${v.name}:${v.value}</p>
                  <p style="font-size: 12px;margin:0 5px">迟到人数:<label style="color:#057bfb;margin-left:8px">${v.info.belatecount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">早退人数:<label style="color:#01edfb;margin-left:8px">${v.info.leaveearlycount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">旷课人数:<label style="color:#ed7d31;margin-left:8px">${v.info.truantcount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">请假人数:<label style="color:#fbdb27;margin-left:8px">${v.info.leavecount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">体温异常:<label style="color:red;margin-left:8px">${v.info.tempecount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">心率异常:<label style="color:red;margin-left:8px">${v.info.heartratecount}</label></p>
                  <p style="font-size: 12px;margin:0 5px">活动量差:<label style="color:red;margin-left:8px">${v.info.lessactivitycount}</label></p>
                </div>`
              }
              return html;
          }
         },
         //左侧展示
         visualMap: {  
          show : true,  
          x: 'left',  
          y: 'bottom',  
          itemWidth: 10,
          itemHeight: 10,
          splitList: [   
              {start: 0, end:0},
              {start: 1, end: 9},  
              {start: 10, end: 49},
              {start: 50, end: 99},  
              {start: 100} 
          ],  
          color: ['#f33', '#f66', '#f99','#fcc', '#fff']  
      },  
          series: [
            {
              name: "信息量",
              type: 'map',
              //这里是'china',及因为js中注册的名字，如果是上海市，则该出需pName 指的是'shanghai'
              mapType: "china",
              selectedMode: false,
              aspectScale: 0.75,
              zoom: 1.2,
              geoIndex: 0,
              data: this.regions
            }
          ]
        };
     myChart.setOption(option);
     var that = this;
      // 点击触发
      myChart.on("click", param => {
        if (param.name in info.province) {
          // 处理省模块
          let names = param.name;
          for (let key in info.province) {
            if (names == key) {
              this.showProvince(info.province[key], key);
              break;
            }
          }
        }
      });
      //展示对应市
      // function showCitys(cName, param) {
      //   console.log(cName, param)
      //   // 显示县级地图
      //   let url='./../../../../static/city/'+cName+'.json'
      //   getCityProvince(url).then(res=>{
      //       echarts.registerMap(param, res);
      //       initEcharts(param,this.regions);
      //   })
      //   // that.$http.get(`../../../static/city/${cName}.json`).then(res=>{
      //   //   that.$echarts.registerMap(param, res);
      //   //   alert("县")
      //   //   initEcharts(param);
      //   // })
      // }
   },
   //展示对应的省
   showProvince(eName,param) {
    // this.getProvcity()
    if(this.prodata){
      let procode='';
      for(let i=0;i<this.prodata.length;i++){
        let name = this.prodata[i].name.substr(0,this.prodata[i].name.length-1);
        if(param === name){
          procode = this.prodata[i].value;
          break;
        }
      }
    let parmas = {
      starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
      endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
      provcode: procode
    }
    //查询该省异常数据汇总
    getCityAttendRecordSum(parmas).then(res=>{
      this.chinaSum = Object.assign({}, res.resultMap.citysum)
      console.log(res)
    })
    let url='./../../../../static/province/'+eName+'.json'
    getCityProvince(url).then(res=>{
        echarts.registerMap(param, res);
        this.title = param + "考勤健康情况"
        this.initquery(2,procode,param)
    })
    }
  }
 }
}