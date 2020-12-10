import charts from "@/components/charts";
import * as mainServer from "@/pages/main/main.server.js";
import main from '@/pages/main/main.js';
export default {
  mixins:[main],
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      dataList: [],
    };
  },
  beforeMount(){
    this.querystaticsA()
  },
  methods: {
    //数据统计列表查询
    initStatistics(type){
      this.querytype=type,
      this.initSumTop();
      this.initAttendTop(1);
      // this.initAttendTop(2);
      this.initHealthTop(2);
      this.querystaticsA();
    },
    //考情异常数据统计
    querystaticsA(){
      let params = {
        starttime: this.starttime,
        endtime: this.endtime,
        schoolcode: this.userInfo.roles[0].schoolcode,
        gradecode: this.userInfo.roles[0].gradecode,
        classcode: this.userInfo.roles[0].classcode,
        querytype: this.querytype,
        page: 0,
        pagesize: 100
      }
      mainServer.querystaticsAttend(params).then(res=>{
        if(res.success){
           this.dataList = res.resultMap.abAttendSumList;
        }
      })
    }
  },
};
