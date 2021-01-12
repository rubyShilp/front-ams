import charts from '@/components/charts'
import * as homeServer from "./homePage.server";
import { formDate } from "@/util/core.js";
import { TimePicker } from 'element-ui';
export default {
  props: {
    school: {
      type: String,
      default: ""
    }
  },
  watch:{
    school(newVal){
      this.$nextTick(()=>{
        this.getheadData(newVal);
        this.getEchartData(newVal,'top');
        this.getEchartData(newVal);
      })
    }
  },
  data() {
    return {
      name: "平湖学院",
      treList: [],
      userType: JSON.parse(sessionStorage.getItem("userInfo")).userType,
      arrs: {},
      starttime:new Date(new Date().getTime()-6*24*60*60*1000),
      endtime:new Date(),
      tabs: [
        {id: 1,name: "学校"},
        {id: 2,name: "年级"},
        {id: 3,name: "班级"}
      ],
      tagflag: false,
      tabType: 1,
      schoolcode: "",
      //echarts信息
      tabPosition: "line",
      chartData_one: [[], []],
      series_one: [['迟到','早退','旷课','请假'],[[], [],[],[]],"1"],
      chartData_two: [[],[],[],[]],
       chartData_three: [[], []],
       series_three: [['迟到','早退','旷课','请假'],[[],[],[],[]],"2"],
       chartData_four: [[], []],
       series_four: [['温度','心率','活动量差'],[ [],[],[]],"3"],
    };
  },
  components: {
    charts
  },
  beforeMount() {
    this.getheadData("");
    this.getEchartData("",'top');
    this.getEchartData("");
  },
  methods: {
    clear(){
      this.chartData_one = [[], []];
      this.series_one = [['迟到','早退','旷课','请假'],[[], [],[],[]],"1"];
      this.chartData_two = [[],[],[],[]];
      this.chartData_three = [[], []];
      this.series_three =  [['迟到','早退','旷课','请假'],[ [],[],[],[]],"2"];
      this.chartData_four = [[], []];
      this.series_four = [['温度','心率','活动量差'],[ [],[],[]],"3"];
    },
    //获取头部数据
    getheadData(code){
      let scode = code;
        let params = {
          starttime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
          endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
          schoolcode: scode,
          querytype: this.tabType
        }
        homeServer.headerData(params).then(res=>{
          if(res.success){
            this.arrs = res.resultMap.abnormalNums
          }
        })
    },
    //获取图表数据
    getEchartData(code,statu){
      let scode = code;
      this.clear();
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: scode,
        querytype: this.tabType,
        sorttype: "1",
        page: "1",
        pagesize: "10",
      }
      if(statu === "top"){
        params.starttime = formDate(new Date(new Date()), "yyyy-MM-dd hh:mm:ss")
      }
        homeServer.echartData(params).then(res=>{
          if(res.success){
            let list = res.resultMap.abAttendTop;
              //获取考勤异常的数据
              for(let i=0;i<list.length;i++){
                //考勤异常学校TOP10
                if(statu === "top"){
                  this.chartData_one[0].push(list[i].basename)
                  this.series_one[1][0].push(list[i].sumbelatecount)
                  this.series_one[1][1].push(list[i].sumleaveearlycount)
                  this.series_one[1][2].push(list[i].sumtruantcount)
                  this.series_one[1][3].push(list[i].sumleavecount)
                }else{
                   //考勤异常周趋势
                  this.chartData_three[0].push(list[i].createtime)
                  this.series_three[1][0].push(list[i].sumbelatecount)
                  this.series_three[1][1].push(list[i].sumleaveearlycount)
                  this.series_three[1][2].push(list[i].sumtruantcount)
                  this.series_three[1][3].push(list[i].sumleavecount)
                }
              }
            if(list.length === 0){
              this.$message({
                type: "error",
                message: "暂无图表数据"
              })
            }
          }
        })
        homeServer.healthData(params).then(res=>{
          if(res.success){
            let list = res.resultMap.abHealthTop;
              //获取健康异常的数据
              for(let i=0;i<list.length;i++){
                //健康异常学校TOP10
                if(statu === "top"){
                  this.chartData_two[3].push(list[i].basename)
                  this.chartData_two[0].push(list[i].sumtempecount)
                  this.chartData_two[1].push(list[i].sumheartratecount)
                  this.chartData_two[2].push(list[i].sumlessactivitycount)
                }else{
                  //健康异常周趋势
                 this.chartData_four[0].push(list[i].createtime)
                 this.series_four[1][0].push(list[i].sumtempecount)
                 this.series_four[1][1].push(list[i].sumheartratecount)
                 this.series_four[1][2].push(list[i].sumlessactivitycount)
                }
              }
              if(list.length === 0){
                this.$message({
                  type: "error",
                  message: "暂无图表数据"
                })
              }
          }
        })
    },
    changeType(type){
      this.tabType = type;
      this.$nextTick(()=>{
        this.getheadData(this.school);
        this.getEchartData(this.school,'top');
        this.getEchartData(this.school);
      })
    }
  },
};
