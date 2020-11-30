import * as attendanceServer from './../attendance.server.js'; 
import { formDate,dateTime } from "@/util/core.js"; 
export default {
  data() {
    return {
      dataList: [],
      starttime:new Date(new Date().getTime()-7*24*60*60*1000),
      endtime:new Date(),
      isRule:false,//是否展开详情信息
      isDetail:false,//是否是详情
      ruleInfo:{},//规则信息详情
    };
  },
  beforeMount() {
    this.initAttendRoleQuery(0);
  },
  methods: {
    //查询学校考勤规则信息
    initAttendRoleQuery(page){
      let params={
        starttime: formDate(new Date(this.starttime), "yyyy-MM-dd hh:mm:ss"),
        endtime: formDate(new Date(this.endtime), "yyyy-MM-dd hh:mm:ss"),
        page:page,
        pageSize:10
      }
      attendanceServer.attendRoleQuery(params).then(res=>{
        if(res.success){
          this.dataList=res.resultMap.attendRules
        }
      })
    }, 
    //查询考勤规则详情信息
    attendRoleDetail(list,type){
      this.ruleInfo = JSON.parse(JSON.stringify(list));
      this.isRule=true;
      if(type==1){
        this.isDetail=true;
      }else{
        this.isDetail=false;
      }
      // let params={rulecode:list.rulecode}
      // attendanceServer.attendRoleDetail(params).then(res=>{
      //   if(res.success){
      //     this.ruleInfo=res.resultMap.attendDevs
      //   }
      // })
    },   
    //编辑考勤规则信息
    attendRoleUpdate(){
      attendanceServer.attendRoleUpdate(this.ruleInfo).then(res=>{
        if(res.success){
          this.initAttendRoleQuery(0)
          this.isRule=false;
        }
      })
    },    
    //删除学校考勤规则信息
    attendRoleRemove(list){
      this.$confirm('是否删除当前规则信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params={rulecode:list.rulecode}
        attendanceServer.attendRoleRemove(params).then(res=>{
          if(res.success){
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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
