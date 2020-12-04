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
      userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
      querytype:1,
      starttime:new Date(new Date().getTime()-7*24*60*60*1000),
      endtime:new Date(),
    };
  },
  beforeMount(){
    this.querystaticsA()
  },
  methods: {
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
