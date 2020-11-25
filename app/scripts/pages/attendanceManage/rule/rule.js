import * as attendanceServer from './../attendance.server.js'; 
export default {
  data() {
    return {
      dataList: [],
    };
  },
  beforeMount() {
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
    //查询学校考勤规则信息
    initAttendRoleQuery(){
      attendanceServer.attendRoleQuery().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    }, 
    //查询考勤规则详情信息
    attendRoleDetail(){
      attendanceServer.attendRoleDetail().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },   
    //编辑考勤规则信息
    attendRoleUpdate(){
      attendanceServer.attendRoleUpdate().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },    
    //删除学校考勤规则信息
    attendRoleRemove(){
      attendanceServer.attendRoleRemove().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },    
    //批量删除学校考勤规则信息
    attendRoleBatchRemove(){
      attendanceServer.attendRoleBatchRemove().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },    
    //新增学校考勤规则信息
    attendRoleAdd(){
      attendanceServer.attendRoleAdd().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },
    //启动考勤规则
    attendRoleApply(){
      attendanceServer.attendRoleApply().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },
    //取消考勤规则
    attendRoleCancel(){
      attendanceServer.attendRoleCancel().then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendDevs
        }
      })
    },
  },
};
