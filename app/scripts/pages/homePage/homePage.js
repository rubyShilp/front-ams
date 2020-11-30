import charts from '@/components/charts'
import * as homeServer from "./homePage.server";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      name: "平湖学院",
      treList: [],
      arrs: {
        sumschoolcount: 3,
        sumbelatecount: 5,
        sumleaveearlycount: 6,
        sumtruantcount: 0,
        sumleavecount: 5,
        sumtempecount: 5,
        sumheartratecount: 0,
        sumlessactivitycount: 10
      },
      tabs: [
        {id: 1,name: "学校"},
        {id: 2,name: "年级"},
        {id: 3,name: "班级"}
      ],
      tabType: 1,
      //echarts信息
      tabPosition: "line",
      chartData_one: [["实验小学","实验二小","实验三小","实验四小","龙岗小学","龙华小学","南山小学"], [0,50,100,150]],
      series_one: [['迟到','早退','旷课','请假'],[[125,125,125,125,125,125,125], [85,85,85,85,85,85,85],[65,65,65,65,65,65,65],[80,80,80,80,80,80,80]],"1"],
      chartData_two: [
        [37.1,36.5,34.1,35.2,40.2,37.2,36.1],
        [77.1,86.5,64.1,55.2,40.2,77.2,26.1],
        [17.1,26.5,34.1,45.2,50.2,67.2,71.1],
        ["实验小学","实验二小","实验三小","实验四小","龙岗小学","龙华小学","南山小学"]
       ],
       chartData_three: [["03/01","03/02","03/03","03/04","03/05","03/06","03/07"], [0,5,10,15]],
       series_three: [['迟到','早退','旷课','请假'],[ [15,20,25,17,20,12,null],[3,5,4,6,5,2,null],[3,5,4,6,5,2,null],[2,4,7,3,4,1,null]],"2"],
       chartData_four: [["03/01","03/02","03/03","03/04","03/05","03/06","03/07"], [0,5,10,15]],
       series_four: [['温度','心率','活动量差'],[ [15,20,25,17,20,12,0],[3,5,4,6,5,2,0],[3,5,4,6,5,2,0]],"3"],
    };
  },
  components: {
    charts
  },
  beforeMount() {
    this.getheadData();
  },
  methods: {
    //获取头部数据
    getheadData(){
      headerData().then(res=>{
        if(res.success){
          this.arrs = res.resultMap.abnormalNums
        }
      })
    },
    getEchartData(){
      let params = {
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        querytype: "2",
        sorttype: "1",
        page: "1",
        pagesize: "10",
      }
    },
    changeType(type){
      this.tabType = type;
    }
  },
};
