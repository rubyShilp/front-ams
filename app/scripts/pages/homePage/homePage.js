import charts from '@/components/charts'
export default {
  data() {
    return {
      name: "平湖学院",
      treList: [],
      arrs: [
        {id:'1',title: '总人数',count: 36000,color: '#276ef9'},
        {id:'2',title: '迟到人数',count: 205,color: '#b9070e'},
        {id:'3',title: '早退人数',count: 100,color: '#b9070e'},
        {id:'4',title: '旷课人数',count: 56,color: '#b9070e'},
        {id:'5',title: '请假人数',count: 66,color: '#b9070e'},
        {id:'6',title: '体温异常',count: 25,color: '#b9070e'},
        {id:'7',title: '心率异常',count: 10,color: '#b9070e'},
        {id:'8',title: '活动量差',count: 360,color: '#b9070e'}
      ],
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
  beforeMount() {},
  methods: {
    changeType(type){
      this.tabType = type;
    }
  },
};