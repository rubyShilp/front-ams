import * as statisticalServer from "./statistical.server.js";
import { formDate, dataCode } from "@/util/core.js";
import charts from "@/components/charts";
import pagination from "@/components/pagination/index";
export default {
  data() {
    return {
      starttime: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      dataList: [],
      totalCount: 0, //總條數
      page: 1,
      pageSize: 10, //每頁顯示條數
      data: [],
      scoolType: 0, //類型(學校,年級,班級)
      schoolcode: "",
      gradecode: "",
      classcode: "",
      handle_dialog: false,
      detail_starttime: new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ),
      detail_endtime: new Date(),
      chartData: [
        [],
        [
          "迟到人数",
          "早退人数",
          "旷课人数",
          "请假人数",
          "体温异常",
          "心率异常",
          "活动量差",
        ],
      ],
      right_data: [],
      bottom_data: [],
      detailtotal: 0,
      detailpage: 1,
      depageSize: 10,
    };
  },
  beforeMount() {
    this.initUserRole();
    for (let i = 0; i < 9; i++) {
      this.bottom_data.push({
        id: "01",
        name: "张三",
        kaostatu: "迟到",
        cstatu: "36.2",
        heartstatu: "60",
        school: "龙岗实验小学",
        class: "一年级2班",
        prantphone: "13455569875",
        prantname: "张三他爸",
        time: "2020-12-08",
      });
    }
  },
  components: {
    charts,
    pagination,
  },
  methods: {
    //初始化学校年级树形结构菜单项
    initUserRole() {
      let params = {};
      statisticalServer.userRole(params).then((res) => {
        if (res.success) {
          this.data = res.resultMap.roleTrees;
          this.schoolcode = this.data[0].id;
          this.schoolDataQuery(0, 1);
        }
      });
    },
    //选择学校或班级或年级信息
    selectTreeDate(item, e) {
      let obj = {};
      for (let i = 0; i < e.level - 1; i++) {
        if (!i) {
          obj = e.parent;
        } else {
          obj = obj.parent;
        }
      }
      if (!obj.data) {
        this.schoolcode = item.id;
      } else {
        this.schoolcode = obj.data.id;
      }
      let parentid = item.parentid;
      if (this.schoolcode === parentid) {
        this.gradecode = item.id;
        this.classcode = "";
      } else {
        if (!obj.data) {
          this.gradecode = "";
          this.classcode = "";
        } else {
          this.gradecode = parentid;
          this.classcode = item.id;
        }
      }
      if (
        this.schoolcode != "" &&
        this.gradecode == "" &&
        this.classcode == ""
      ) {
        this.schoolDataQuery(0, 1);
      } else if (
        this.schoolcode != "" &&
        this.gradecode != "" &&
        this.classcode == ""
      ) {
        this.schoolDataQuery(0, 2);
      } else if (
        this.schoolcode != "" &&
        this.gradecode != "" &&
        this.classcode != ""
      ) {
        this.schoolDataQuery(0, 3);
      }
    },
    //根據學校查詢考勤統計信息
    schoolDataQuery(page, type) {
      this.scoolType = type;
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: dataCode(this.schoolcode),
        gradecode: dataCode(this.gradecode),
        classcode: dataCode(this.classcode),
        querytype: type,
        sorttype: 1,
        page: page,
        paegsize: this.pageSize,
      };
      statisticalServer.attendTop(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.abAttendSumList;
          this.totalCount = res.resultMap.total;
        }
      });
    },
    detail(type) {
      let schoolcode = "";
      let gradecode = "";
      let classcode = "";
      if (this.schoolcode) {
        schoolcode = this.schoolcode.slice(3);
      }
      if (this.gradecode) {
        gradecode = this.gradecode.slice(2);
      }
      if (this.classcode) {
        classcode = this.classcode.slice(2);
      }
      let params = {
        starttime: formDate(
          new Date(this.detail_starttime),
          "yyyy-MM-dd hh:mm:ss"
        ),
        endtime: formDate(new Date(this.detail_endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: schoolcode,
        gradecode: gradecode,
        classcode: classcode,
        querytype: this.scoolType,
        page: this.detailpage,
        pagesize: this.depageSize,
      };
      statisticalServer.getStatisticsList(params).then((res) => {
        if (res.success) {
          let result = res.resultMap.abnormalNums;
          //左侧饼图数据
          this.chartData[0].push(result.sumbelatecount);
          this.chartData[0].push(result.sumleaveearlycount);
          this.chartData[0].push(result.sumtruantcount);
          this.chartData[0].push(result.sumleavecount);
          this.chartData[0].push(result.sumtempecount);
          this.chartData[0].push(result.sumheartratecount);
          this.chartData[0].push(result.sumlessactivitycount);
          //右侧列表数据
          if (this.chartData[0].length != 0) {
            this.chartData[0].forEach((item, index) => {
              this.right_data.push({
                id: index,
                name: this.chartData[1][index],
                count: item,
              });
            });
            //详情表格数据
            this.bottom_data = [...res.resultMap.realattends];
            this.detailtotal = res.resultMap.total;
            if (type !== 1) {
              this.handle_dialog = true;
            }
          } else {
            this.$message.error("暂无数据");
          }
        }
      });
    },
    detailQuery() {
      this.right_data = [];
      this.chartData[0] = [];
      //详情查询
      this.detail(1);
    },
    //每頁顯示條數
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.page = page;
    },
    //删除統計信息
    statisticalRemove(list) {
      this.$confirm("是否删除当前統計信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
