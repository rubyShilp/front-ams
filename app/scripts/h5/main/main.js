import charts from "@/components/charts";
import * as mainServer from "@/pages/main/main.server.js";
import main from "@/pages/main/main.js";
import { formDate } from "@/util/core.js";
export default {
  mixins: [main],
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      dataList: [],
      brandFold: true,
      brandFold2: true,
      tagname: "学校",
      downtype: 1,
    };
  },
  beforeMount() {
    // this.initSumTop();
    // this.initAttendTop(1);
    // this.initAttendTop(2);
    // this.initHealthTop(2);
    this.querystaticsA();
  },
  computed: {
    showdetailList: {
      get: function() {
        if (this.brandFold) {
          if (this.dataList.length < 7) {
            return this.dataList;
          }
          let newArr = [];
          for (var i = 0; i < 6; i++) {
            let item = this.dataList[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.dataList;
      },
      set: function(val) {
        this.showdetailList = val;
      },
    },
    showdetailList2: {
      get: function() {
        if (this.brandFold2) {
          if (this.attendanceList.length < 7) {
            return this.attendanceList;
          }
          let newArr = [];
          for (var i = 0; i < 6; i++) {
            let item = this.attendanceList[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.attendanceList;
      },
      set: function(val) {
        this.showdetailList2 = val;
      },
    },
  },
  methods: {
    //数据统计列表查询
    initStatistics(type) {
      this.querytype = type;
      if (type === 1) {
        this.tagname = "学校";
      } else if (type === 2) {
        this.tagname = "年级";
      } else if (type === 3) {
        this.tagname = "班级";
      }
      this.querystaticsA();
    },
    //考情异常数据统计
    querystaticsA() {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: "",
        gradecode: "",
        classcode: "",
        querytype: this.querytype,
        page: 1,
        pagesize: 100,
      };
      if (this.userInfo.roles.length > 1) {
        params.schoolcode = "";
      } else if ((this.userInfo.roles.length = 1)) {
        params.schoolcode = this.userInfo.roles[0].schoolcode;
      }
      mainServer.querystaticsAttend(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.abAttendSumList;
        }
      });
    },
    changeFoldState(type) {
      if (type === 1) {
        this.brandFold = !this.brandFold;
      } else {
        this.brandFold2 = !this.brandFold2;
      }
    },
  },
};
