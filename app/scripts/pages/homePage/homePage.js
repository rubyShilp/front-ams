import charts from '@/components/charts'
import * as homeServer from "./homePage.server";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      name: "平湖学院",
      treList: [],
      arrs: {},
      starttime:new Date(new Date().getTime()-30*24*60*60*1000),
      endtime:new Date(),
      tabs: [
        {id: 1,name: "学校"},
        {id: 2,name: "年级"},
        {id: 3,name: "班级"}
      ],
      tabType: 1,
      schoolcode: (JSON.parse(sessionStorage.getItem("userInfo"))).roles[0].schoolcode,
      //echarts信息
      tabPosition: "line",
      chartData_one: [[], [0,50,100,150]],
      series_one: [['迟到','早退','旷课','请假'],[[], [],[],[]],"1"],
      chartData_two: [[],[],[],[]],
       chartData_three: [[], [0,5,10,15]],
       series_three: [['迟到','早退','旷课','请假'],[ [],[],[],[]],"2"],
       chartData_four: [[], [0,5,10,15]],
       series_four: [['温度','心率','活动量差'],[ [],[],[]],"3"],
    };
  },
  components: {
    charts
  },
  beforeMount() {
    this.getheadData();
    this.getEchartData('1');
    this.getEchartData('2');
  },
  methods: {
    //获取头部数据
    getheadData(){
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode:this.schoolcode,
        querytype: this.tabType
      }
      homeServer.headerData(params).then(res=>{
        if(res.success){
          this.arrs = res.resultMap.abnormalNums
        }
      })
    },
    //图标数据为空
    emptyData(classname,title){
      var html = '<div style="padding:10px;"><span style="font-size: 18px;font-weight: bold;color: #2991d0;">'+ title +'</span><span  style="position: absolute;top: 50%;left: 45%;color:#ccc; font-size: 20px;">暂无数据</span></div>'
      document.getElementsByClassName(classname)[0].innerHTML = html
      document.getElementsByClassName(classname)[0].removeAttribute('_echarts_instance_')
    },
    //获取图表数据
    getEchartData(type){
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        querytype: this.tabType,
        sorttype: "1",
        page: "1",
        pagesize: "10",
      }
      if(type === "1"){
        homeServer.echartData(params).then(res=>{
          if(res.success){
            let list = res.resultMap.abAttendTop;
              //获取考勤异常的数据
              for(let i=0;i<list.length;i++){
                //考勤异常学校TOP10
                this.chartData_one[0].push(list[i].basename)
                this.series_one[1][0].push(list[i].sumbelatecount)
                this.series_one[1][1].push(list[i].sumleaveearlycount)
                this.series_one[1][2].push(list[i].sumtruantcount)
                this.series_one[1][3].push(list[i].sumleavecount)
                //考勤异常周趋势
                this.chartData_three[0].push(list[i].createtime)
                this.series_three[1][0].push(list[i].sumbelatecount)
                this.series_three[1][1].push(list[i].sumleaveearlycount)
                this.series_three[1][2].push(list[i].sumtruantcount)
                this.series_three[1][3].push(list[i].sumleavecount)
              }
            if(this.chartData_one[0].length === 0 || this.series_one[1][0].length === 0){
              this.emptyData('chart1','当前考勤异常学校TOP10')
            }
            if(this.chartData_three[0].length === 0 || this.series_three[1][0].length === 0){
              this.emptyData('chart3','学校考勤异常周趋势')
            }
          }
        })
      }else if(type === "2"){
        homeServer.healthData(params).then(res=>{
          if(res.success){
            let list = res.resultMap.abHealthTop;
              //获取健康异常的数据
              for(let i=0;i<list.length;i++){
                //健康异常学校TOP10
                this.chartData_two[3].push(list[i].basename)
                this.chartData_two[0][0].push(list[i].sumtempecount)
                this.chartData_two[0][1].push(list[i].sumheartratecount)
                this.chartData_two[0][2].push(list[i].sumlessactivitycount)
                //健康异常周趋势
                this.chartData_four[0].push(list[i].createtime)
                this.series_four[1][0].push(list[i].sumtempecount)
                this.series_four[1][1].push(list[i].sumheartratecount)
                this.series_four[1][2].push(list[i].sumlessactivitycount)
              }
            if(this.chartData_two[3].length === 0){
              this.emptyData('chart2','当前健康异常学校TOP10')
            }
            if(this.chartData_four[0].length === 0 || this.series_four[1][0].length === 0){
              this.emptyData('chart4','学校健康异常周趋势')
            }
          }
        })
      }
    },
    changeType(type){
      this.tabType = type;
      this.getheadData();
      this.getEchartData("1");
      this.getEchartData("2");
    }
  },
};
