import { post } from "@/servers/httpServer.js";
//获取当前登陆人的学校信息
export const getSchool = async (params) => {
  let result = await post("/alading/api/school/getAllSchools", params);
  return result.data;
};
//头部数据
export const sumTop = async (params) => {
  let result = await post(
    "/alading/api/statistics/getStatisticsAbAttendNums",
    params
  );
  return result.data;
};
//统计考勤异常数据
export const attendTop = async (params) => {
  let result = await post(
    "/alading/api/statistics/statisticsAbAttendTop",
    params
  );
  return result.data;
};
//统计健康异常数据
export const healthTop = async (params) => {
  let result = await post(
    "/alading/api/statistics/statisticsAbHealthTop",
    params
  );
  return result.data;
};
//统计体温分布
export const statisticsTemper = async (params) => {
  let result = await post(
    "/alading/api/statistics/statisticsTemperDist",
    params
  );
  return result.data;
};
//考勤异常实时统计数据
export const statisticsRealAttend = async (params) => {
  let result = await post(
    "/alading/api/statistics/statisticsRealAttend",
    params
  );
  return result.data;
};
