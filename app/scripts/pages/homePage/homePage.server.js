import {get,post} from '@/servers/httpServer.js'
//首页头部信息
export const headerData=async (params)=>{
    let result=await post('/alading/api/statistics/getStatisticsAbAttendNums',params);
    return result.data;
}

//图表数据   考勤异常
export const echartData=async (params)=>{
    let result=await post('/alading/api/statistics/statisticsAbAttendTop',params);
    return result.data;
}

//图表数据   健康异常
export const healthData=async (params)=>{
    let result=await post('/alading/api/statistics/statisticsAbHealthTop',params);
    return result.data;
}