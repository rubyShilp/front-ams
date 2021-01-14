import * as attendanceServer from "./../attendance.server.js";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      schoolList: JSON.parse(sessionStorage.getItem("schoolList")),
      dataList: [],
      totalCount: 0, //總條數
      page: 1,
      pagesize: 10, //每頁顯示條數
      schoolcode: "",
      starttime: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endtime: new Date(),
      isEquipment: false, //是否展开详情信息
      isDetail: false, //是否是详情
      isAddOrUpdae: false, //是否为编辑或新增
      equipmentInfo: {},
      selectDataList: [], //获取选中的值
    };
  },
  beforeMount() {
    this.initAcceptorQuery(1);
  },
  methods: {
    //查询学校考勤设备信息
    initAcceptorQuery(page) {
      let params = {
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        schoolcode: this.schoolcode,
        page: page,
        pagesize: this.pagesize,
      };
      attendanceServer.acceptorQuery(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
          this.totalCount = res.resultMap.total;
        }
      });
    },
    //每頁顯示條數
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.initAcceptorQuery(1);
    },
    //跳轉的頁碼
    handleCurrentChange(page) {
      this.page = page;
      this.initAcceptorQuery(page);
    },
    //查询考勤设备详情信息
    acceptorDetial(list, type) {
      this.isEquipment = true;
      this.equipmentInfo = JSON.parse(JSON.stringify(list));
      if (type == 1) {
        this.isAddOrUpdae = false;
        this.isDetail = true;
      } else {
        this.isDetail = false;
      }
    },
    //新增考勤设备信息
    acceptorBatchAdd() {
      this.isEquipment = true;
      this.isDetail = false;
      this.isAddOrUpdae = true;
      this.equipmentInfo = {
        schoolname: this.schoolList[1].schoolname,
        schoolcode: this.schoolList[1].schoolcode,
        rfidno: "",
        rfidlocation: "",
        rfiddirect: "",
        rfidgroupid: "",
        createtime: new Date(),
      };
    },
    //编辑或新增设备信息
    acceptorAddOrUpdate() {
      if (this.isAddOrUpdae) {
        this.acceptorCreate();
      } else {
        this.acceptorUpdate();
      }
    },
    //编辑考勤设备信息
    acceptorUpdate() {
      this.equipmentInfo.createtime = formDate(
        new Date(this.equipmentInfo.createtime),
        "yyyy-MM-dd hh:mm:ss"
      );
      attendanceServer.acceptorUpdate(this.equipmentInfo).then((res) => {
        if (res.success) {
          this.initAcceptorQuery(1);
          this.isEquipment = false;
        }
      });
    },
    //新增学校考勤设备信息
    acceptorCreate() {
      this.equipmentInfo.createtime = formDate(
        new Date(this.equipmentInfo.createtime),
        "yyyy-MM-dd hh:mm:ss"
      );
      attendanceServer.acceptorCreate(this.equipmentInfo).then((res) => {
        if (res.success) {
          this.initAcceptorQuery(1);
          this.isEquipment = false;
        }
      });
    },
    //删除学校考勤设备信息
    acceptorRemove(list) {
      this.$confirm("是否删除当前设备信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = { acceptorcode: list.acceptorcode };
          attendanceServer.acceptorRemove(params).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initAcceptorQuery(1);
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
    //选择删除的数据
    selectData(list) {
      this.selectDataList = [];
      for (let i = 0; i < list.length; i++) {
        this.selectDataList.push(list[i].acceptorcode);
      }
    },
    //批量删除学校考勤设备信息
    acceptorBatchRemove() {
      if (this.selectDataList.length == 0) {
        this.$message.warning("请选择要删除的数据");
        return false;
      }
      let params = {
        acceptorcodes: this.selectDataList.join(","),
      };
      attendanceServer.acceptorBatchRemove(params).then((res) => {
        if (res.success) {
          this.initAcceptorQuery(1);
        }
      });
    },
  },
};
