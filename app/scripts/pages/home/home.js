import charts from './charts'
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
      series_one: [['迟到','早退','旷课','请假'],[[125,125,125,125,125,125,125], [85,85,85,85,85,85,85],[65,65,65,65,65,65,65],[80,80,80,80,80,80,80]]],
    };
  },
  components: {
    charts
  },
  beforeMount() {
    for (let i = 0; i < 3; i++) {
      this.treList.push({
        name: "深圳实验学校12222222222222222" + i,
      });
    }
    this.name = this.treList[0].name;
  },
  methods: {
    select(name) {
      this.name = name;
    },
    changeType(type){
      this.tabType = type;
    }
  },
};
