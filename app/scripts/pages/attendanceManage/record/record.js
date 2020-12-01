import * as attendanceServer from "./../attendance.server.js";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      dataList: [],
      totalCount:0,//總條數
      page:1,
      pageSize:10,//每頁顯示條數
      data: [],
      starttime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      schoolcodeId:'',
      schoolcode: "", //学校id
      gradeId: "", //年级id
      classId: "", //班级id
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
          this.initAttendTop(0);
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
        this.gradeId = item.id;
        this.classId = "";
      } else {
        if(!obj.data){
          this.gradeId = '';
          this.classId = '';
        }else{
          this.gradeId = parentid;
          this.classId = item.id;
        }
       
      }
      this.initAttendTop(0);
    },
    //获取当前学校或班级或年级考勤信息
    initAttendTop(page) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        gradeId: this.gradeId,
        classId: this.classId,
        page: page,
        pagesize: this.pageSize,
      };
      attendanceServer.attendRecord(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendrecords;
        }
      });
    },
     //每頁顯示條數
     handleSizeChange(pageSize){
      this.pageSize=pageSize;
      this.initAttendTop(0);
    },
    //跳轉的頁碼
    handleCurrentChange(page){
      this.page=page;
      this.initAttendTop(page-1);
    },
  },
};
