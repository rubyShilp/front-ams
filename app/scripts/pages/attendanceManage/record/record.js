import * as attendanceServer from "./../attendance.server.js";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      dataList: [],
      totalCount: 0, //總條數
      page: 1,
      pagesize: 10, //每頁顯示條數
      data: [],
      isRecordDetail: false, //是否显示考勤记录详情
      recordDetail: {}, //考勤记录详情
      studentname: "",
      starttime: new Date(new Date().toLocaleDateString()),
      endtime: new Date(),
      schoolcodeId: "",
      schoolcode: "", //学校id
      gradecode: "", //年级id
      classcode: "", //班级id
      colors: ["#000", "#057bfb", "#01edfb", "#ed7d31", "#fbdb27"],
    };
  },
  beforeMount() {
    this.initUserRole();
  },
  methods: {
    //初始化学校年级树形结构菜单项
    initUserRole() {
      let params = {};
      attendanceServer.userRole(params).then((res) => {
        if (res.success) {
          this.data = res.resultMap.roleTrees;
          this.schoolcode = this.data[0].id;
          this.initAttendTop(1);
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
      this.initAttendTop(1);
    },
    //获取当前学校或班级或年级考勤信息
    initAttendTop(page) {
      let params = {
        stuname: this.studentname,
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        gradecode: this.gradecode,
        classcode: this.classcode,
        page: page,
        pagesize: this.pagesize,
      };
      attendanceServer.attendRecord(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendrecords;
          this.totalCount = res.resultMap.total;
        }
      });
    },
    //每頁顯示條數
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.initAttendTop(1);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.page = page;
      this.initAttendTop(page);
    },
    //详情
    detailRecord(list) {
      this.recordDetail = list;
      this.isRecordDetail = true;
      // let params={attendcode:list.attendcode};
      // attendanceServer.detailRecord(params).then(res=>{
      //   if(res.success){
      //    this.recordDetail=res.resultMap;
      //    this.isRecordDetail=true;
      //   }
      // })
    },
    //恢复
    updateRecord(list) {
      let params = {
        attendcode: list.attendcode,
        attendstate: 1,
        inoutstate: 1,
      };
      attendanceServer.updateRecord(params).then((res) => {
        if (res.success) {
          this.$message.success("修正成功");
          this.initAttendTop(1);
        }
      });
    },
  },
};
