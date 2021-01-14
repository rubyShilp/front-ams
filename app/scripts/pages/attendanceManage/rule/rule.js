import * as attendanceServer from "./../attendance.server.js";
import { formDate, dateTime } from "@/util/core.js";
export default {
  data() {
    return {
      schoolList: JSON.parse(sessionStorage.getItem("schoolList")),
      dataList: [],
      totalCount: 0, //總條數
      page: 1,
      pageSize: 10, //每頁顯示條數
      schoolcode: "",
      starttime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      isRule: false, //是否展开详情信息
      isDetail: false, //是否是详情
      isAddOrUpdate: false, //是否新增或编辑
      ruleInfo: {}, //规则信息详情
      selectDataList: [], //选择考勤规则数据
    };
  },
  beforeMount() {
    this.initAttendRoleQuery(1);
  },
  methods: {
    //查询学校考勤规则信息
    initAttendRoleQuery(page) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        page: page,
        pageSize: this.pageSize,
      };
      attendanceServer.attendRoleQuery(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendRules;
          this.totalCount = res.resultMap.total;
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].rulestate == 0) {
              this.dataList[i].isRuleState = true;
            } else {
              this.dataList[i].isRuleState = false;
            }
          }
        }
      });
    },
    //每頁顯示條數
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.initAttendRoleQuery(1);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.page = page;
      this.initAttendRoleQuery(page);
    },
    //查询考勤规则详情信息
    attendRoleDetail(list, type) {
      this.ruleInfo = JSON.parse(JSON.stringify(list));
      this.isRule = true;
      if (type == 1) {
        this.isDetail = true;
      } else {
        this.isDetail = false;
      }
    },
    //新增考勤设备信息
    attendRolAdd() {
      this.isRule = true;
      this.isDetail = false;
      this.isAddOrUpdate = true;
      this.ruleInfo = {
        schoolname: "",
        morschtime: "",
        morhometime: "",
        minschtime: "",
        minhometime: "",
        nightschtime: "",
        nighthometime: "",
      };
    },
    //编辑或新增设备信息
    attendRoleAddOrUpdate() {
      if (this.isAddOrUpdate) {
        this.attendRoleAdd();
      } else {
        this.attendRoleUpdate();
      }
    },
    //编辑考勤规则信息
    attendRoleUpdate() {
      attendanceServer.attendRoleUpdate(this.ruleInfo).then((res) => {
        if (res.success) {
          this.initAttendRoleQuery(1);
          this.isRule = false;
        }
      });
    },
    //新增学校考勤规则信息
    attendRoleAdd() {
      attendanceServer.attendRoleAdd(this.ruleInfo).then((res) => {
        if (res.success) {
          this.initAttendRoleQuery(1);
          this.isRule = false;
        }
      });
    },
    //删除学校考勤规则信息
    attendRoleRemove(list) {
      this.$confirm("是否删除当前规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          attendanceServer.attendRoleRemove(list.rulecode).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initAttendRoleQuery(1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //选择考勤规则信息
    selectData(list) {
      for (let i = 0; i < list.length; i++) {
        this.selectDataList.push(list[i].rulecode);
      }
    },
    //批量删除学校考勤规则信息
    attendRoleBatchRemove() {
      this.$confirm("是否删除选中规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.selectDataList.length == 0) {
            this.$message.warning("请选择要删除的数据");
            return false;
          }
          let params = {
            rulecodes: this.selectDataList.join(","),
          };
          attendanceServer
            .attendRoleBatchRemove(params.rulecodes)
            .then((res) => {
              if (res.success) {
                this.initAttendRoleQuery(1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //启动考勤规则
    attendRoleApply(list) {
      this.$confirm(
        "是否" + (list.rulestate == 0 ? "禁用" : "启用") + "该考勤规则?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let params = {
            schoolcode: list.schoolcode,
            rulecode: list.rulecode,
            rulestate: list.rulestate == 0 ? 1 : 0,
          };
          attendanceServer.attendRoleApply(params).then((res) => {
            if (res.success) {
              if (res.success) {
                this.initAttendRoleQuery(1);
                this.$message({
                  type: "success",
                  message: (list.rulestate == 0 ? "禁用" : "启用") + "成功!",
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message:
              "已取消" + (list.rulestate == 0 ? "禁用" : "启用") + "规则",
          });
        });
    },
  },
};
