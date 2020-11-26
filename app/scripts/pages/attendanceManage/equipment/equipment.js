import * as attendanceServer from "./../attendance.server.js";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  beforeMount() {
    this.initAcceptorQuery();
    for (let i = 0; i < 20; i++) {
      this.dataList.push({
        school: "深圳实验学校",
        lateCount: 23,
        earlyCount: 2,
        truancyCount: 12,
        leaveCount: 12,
        temperatureBody: "正常",
        heartBody: "正常",
        activityBody: "正常",
      });
    }
  },
  methods: {
    //查询学校考勤设备信息
    initAcceptorQuery() {
      let params = {
        starttime: "2020-11-10 00:00:00",
        endtime: "2020-11-20 23:59:59",
      };
      attendanceServer.acceptorQuery(params).then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
    //查询考勤设备详情信息
    acceptorDetial() {
      attendanceServer.acceptorDetial().then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
    //编辑考勤设备信息
    acceptorUpdate() {
      attendanceServer.acceptorUpdate().then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
      });
    },
    //删除学校考勤设备信息
    acceptorRemove() {
      attendanceServer.acceptorRemove().then((res) => {
        if (res.success) {
          this.dataList = res.resultMap.attendDevs;
        }
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
