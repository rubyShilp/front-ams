import {post} from '@/servers/httpServer.js'
/**
 * 
 * 考勤管理接口调用
*/
//获取学校年级班级树形菜单项
export const userRole=async (params)=>{
    let result=await post('/alading/api/role/getUserRole',params);
    return result.data;
}
/**
 * 
 * 考勤设备接口调用
*/
//创建考勤设备信息
export const acceptorCreate=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/createAcceptorInfo',params);
    return result.data;
}
//查询考勤设备详情信息
export const acceptorDetial=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/getAcceptorInfoDetail',params);
    return result.data;
}
//编辑考勤设备信息
export const acceptorUpdate=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/updateAcceptorInfo',params);
    return result.data;
}
//查询学校考勤设备信息
export const acceptorQuery=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/getAttendDevsByPage',params);
    return result.data;
}
//删除考勤设备信息
export const acceptorRemove=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/removeAttendDev',params);
    return result.data;
}
//批量删除考勤设备信息
export const acceptorBatchRemove=async (params)=>{
    let result=await post('/alading/api/attend/acceptor/batchRemoveDevs',params);
    return result.data;
}
/**
 * 考勤规则接口调用
 * **/
//创建考勤规则
export const attendRoleAdd=async (params)=>{
    let result=await post('/alading/api/attend/rule/createAttendRule',params);
    return result.data;
}
//查询考勤规则详情
export const attendRoleDetail=async (params)=>{
    let result=await post('/alading/api/attend/rule/getAttendRuleDetail',params);
    return result.data;
}
//编辑考勤规则详情
export const attendRoleUpdate=async (params)=>{
    let result=await post('/alading/api/attend/rule/updateAttendRule',params);
    return result.data;
}
//查询学校的考勤规则信息
export const attendRoleQuery=async (params)=>{
    let result=await post('/alading/api/attend/rule/getAttendRulesByPage',params);
    return result.data;
}
//删除学校的考勤规则信息
export const attendRoleRemove=async (params)=>{
    let result=await post('/alading/api/attend/rule/removeAttendRule',params);
    return result.data;
}
//批量删除学校的考勤规则信息
export const attendRoleBatchRemove=async (params)=>{
    let result=await post('/alading/api/attend/rule/batchRemoveAttendRule',params);
    return result.data;
}
//启动考勤规则
export const attendRoleApply=async (params)=>{
    let result=await post('/alading/api/attend/rule/applyAttendRule',params);
    return result.data;
} 
//取消考勤规则
export const attendRoleCancel=async (params)=>{
    let result=await post('/alading/api/attend/rule/cancelAttendRule',params);
    return result.data;
} 