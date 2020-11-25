import {post} from '@/servers/httpServer.js'
//统计考勤异常数据
export const attendTop=async (params)=>{
    let result=await post('/alading/api/statistics/statisticsAbAttendTop',params);
    return result.data;
}
//统计健康异常数据
export const healthTop=async (params)=>{
    let result=await post('/alading/api/statistics/statisticsAbHealthTop',params);
    return result.data;
}