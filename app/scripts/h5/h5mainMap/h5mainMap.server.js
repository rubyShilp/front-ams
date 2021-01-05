import { get,post} from "@/servers/httpServer.js";
export const getCityProvince = async (url)=>{
    let result = await get(url,{});
    return result.data;
}
//查询角色详情
export const getProvAttendSum = async (params) => {
    let result = await post("/alading/api/map/getProvAttendRecordSum", params);
    return result.data;
};
//获取省份信息
export const getAllProvinces = async (params) => {
    let result = await post("/alading/api/map/getAllProvinces", params);
    return result.data;
};
//获取市区信息
export const getAllCitysByProvcode = async (params) => {
    let result = await post("/alading/api/map/getAllCitysByProvcode", params);
    return result.data;
};
//查询各省考勤异常记录汇总
export const getProvAttendRecords = async (params) => {
    let result = await post("/alading/api/map/getProvAttendRecords", params);
    return result.data;
};
//查询各城市考勤异常记录汇总
export const getCityAttendRecords = async (params) => {
    let result = await post("/alading/api/map/getCityAttendRecords", params);
    return result.data;
};
//查询全省考勤异常记录汇总
export const getCityAttendRecordSum = async (params) => {
    let result = await post("/alading/api/map/getCityAttendRecordSum", params);
    return result.data;
};