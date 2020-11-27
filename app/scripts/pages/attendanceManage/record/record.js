import * as attendanceServer from './../attendance.server.js'; 
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      dataList: [],
      data: [],
      schoolcode:'',//学校id
    };
  },
  beforeMount() {
    this.initUserRole();
    this.initAttendTop();
  },
  methods: {
    //初始化学校年级树形结构菜单项
    initUserRole(){
      let params={}
      attendanceServer.userRole(params).then(res=>{
        if(res.success){
          this.data=res.resultMap.roleTrees
        }
      })
    },
    //选择学校或班级或年级信息
    selectTreeDate(item,e){
      let obj = {}
      for (let i = 0; i < e.level - 1; i++) {
      	if (!i) {
      		obj = e.parent
      	   } else {
      	     obj = obj.parent
      	   }
      }
      let reg = /[^:]*:([^:]*)/;
      this.schoolcode=obj.data.id.replace(reg,"$1");
      console.log('最外层父级数据：', this.schoolcode)
    },
    //获取当前学校或班级或年级考勤信息
    initAttendTop(){
      let params={
        starttime: formDate(new Date("2020-11-10"), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date("2020-11-20"), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        page: 0,
        pagesize: 10,
      }
      attendanceServer.attendRecord(params).then(res=>{
        if(res.success){
          console.log(res);
          this.dataList=res.resultMap.attendrecords;
        }
      })
    }
  },
};
