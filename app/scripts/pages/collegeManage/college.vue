<template>
  <div class="sub-menu-center">
    <el-container style="position: absolute; height: 100%; width: 100%">
      <el-aside class="left-batch-wrap">
        <el-tree
          :data="data"
          :props="defaultProps"
          highlight-current
          :default-expand-all="false"
          :expand-on-click-node="false"
          @node-click="selectTreeDate"
        ></el-tree>
      </el-aside>
      <component
        v-bind:is="currentTabComponent"
        :ids="itemIds"
        :key="timer"
        @resetquery="resetquery"
      ></component>
    </el-container>
  </div>
</template>
<script>
import * as attendanceServer from "../attendanceManage/attendance.server";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      currentTabComponent: "grade",
      data: [],
      starttime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      schoolcode: "", //学校id
      gradeId: "", //年级id
      classId: "", //班级id
      itemIds: {
        schoolcode: JSON.parse(sessionStorage.getItem("userInfo")).roles[0]
          .schoolcode,
        gradeId: "",
        classId: "",
      },
      timer: "",
    };
  },
  components: {
    grade: () => import("./gradeManage/gradeManage"),
    class: () => import("./classManage/classManage"),
    student: () => import("./studentManage/studentManage"),
  },
  beforeMount() {
    this.initUserRole();
  },
  methods: {
    resetquery() {
      this.initUserRole();
    },
    //初始化学校年级树形结构菜单项
    initUserRole() {
      let params = {};
      attendanceServer.userRole(params).then((res) => {
        if (res.success) {
          this.data = res.resultMap.roleTrees;
          this.schoolcode = this.data[0].id;
          //   this.initAttendTop(1);
        }
      });
    },
    //切换组件
    changeComponent(level) {
      switch (level) {
        case 1:
          this.currentTabComponent = "grade";
          break;
        case 2:
          this.currentTabComponent = "class";
          break;
        case 3:
          this.currentTabComponent = "student";
          break;
      }
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
        this.itemIds.schoolcode = item.id;
      } else {
        this.itemIds.schoolcode = obj.data.id;
      }
      let parentid = item.parentid;
      if (this.itemIds.schoolcode === parentid) {
        this.itemIds.gradeId = item.id;
        this.itemIds.classId = "";
      } else {
        if (!obj.data) {
          this.itemIds.gradeId = "";
          this.itemIds.classId = "";
        } else {
          this.itemIds.gradeId = parentid;
          this.itemIds.classId = item.id;
        }
      }
      this.timer = new Date().getTime();
      this.changeComponent(e.level);
    },
    //获取当前学校或班级或年级的列表信息
    // initAttendTop(page){
    //   let params={
    //     // starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
    //     // endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
    //     schoolcode: this.schoolcode,
    //     gradeId:this.gradeId,
    //     classId:this.classId,
    //     page: page,
    //     pagesize: 10,
    //   }
    //   attendanceServer.attendRecord(params).then(res=>{
    //     if(res.success){
    //       this.dataList=res.resultMap.attendrecords;
    //     }
    //   })
    // }
  },
};
</script>
