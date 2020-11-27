import * as attendanceServer from './../attendance.server.js'; 
export default {
  data() {
    return {
      dataList: [],
    };
  },
  beforeMount() {
    this.initAttendRoleQuery();
  },
  methods: {
    //查询学校考勤规则信息
    initAttendRoleQuery(){
      let params={page:0,pageSize:10}
      attendanceServer.attendRoleQuery(params).then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendRules
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
