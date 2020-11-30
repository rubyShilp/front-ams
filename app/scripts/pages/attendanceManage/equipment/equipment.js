import * as attendanceServer from "./../attendance.server.js";
import { formDate } from "@/util/core.js";
export default {
  data() {
    return {
      dataList: [],
      starttime:new Date(new Date().getTime()-7*24*60*60*1000),
      endtime:new Date(),
      isEquipment:false,//是否展开详情信息
      isDetail:false,//是否是详情
      equipmentInfo:{},
    };
  },
  beforeMount() {
    this.initAcceptorQuery(0);
  },
  methods: {
    //查询学校考勤设备信息
    initAcceptorQuery(page) {
      let params={
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        page:page,
        pageSize:10
      }
      attendanceServer.acceptorQuery(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
    //查询考勤设备详情信息
    acceptorDetial(list,type) {
      this.isEquipment=true;
      this.equipmentInfo =  JSON.parse(JSON.stringify(list));
      if(type==1){
        this.isDetail=true;
      }else{
        this.isDetail=false;
      }
      // let params={acceptorcode:list.acceptorcode}
      // attendanceServer.acceptorDetial(params).then((res) => {
      //   if (res.success) {
          
      //   }
      // });
    },
    //编辑考勤设备信息
    acceptorUpdate() {
      attendanceServer.acceptorUpdate(this.equipmentInfo).then((res) => {
        if (res.success) {
          this.initAcceptorQuery(0);
          this.isEquipment=false;
        }
      });
    },
    //删除学校考勤设备信息
    acceptorRemove(list) {
      this.$confirm('是否删除当前设备信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params={acceptorcode:list.acceptorcode}
        attendanceServer.acceptorRemove(params).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //批量删除学校考勤设备信息
    acceptorBatchRemove() {
      attendanceServer.acceptorBatchRemove().then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
    //新增学校考勤设备信息
    acceptorCreate() {
      attendanceServer.acceptorCreate().then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
  },
};
