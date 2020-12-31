import { post } from "@/servers/httpServer.js";
//获取全国考情异常数据
export const getAllRecordSum = async (params) => {
    let result = await post("/alading/api/map/getProvAttendRecordSum", params);
    return result.data;
  };
//获取各个市区人员总数
export const getCityAttendRecords = async (params) => {
  let result = await post("/alading/api/map/getCityAttendRecords", params);
  return result.data;
};