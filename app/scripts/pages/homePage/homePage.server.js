import {get,post} from '@/servers/httpServer.js'
//首页头部信息
export const headerData=async (params)=>{
    let result=await post('/alading/api/statistics/getStatisticsAbAttendNums',params);
    return result.data;
}

//图表数据
export const echartData=async (params)=>{
    let result=await post('/alading/api/statistics/statisticsAbAttendTop',params);
    return result.data;
}