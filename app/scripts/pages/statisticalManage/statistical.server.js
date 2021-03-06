import { post, get } from "@/servers/httpServer.js";
//获取学校年级班级树形菜单项
export const userRole = async (params) => {
    let result = await post("/alading/api/role/getUserRole", params);
    return result.data;
};
//统计考勤异常数据
export const attendTop = async (params) => {
    let result = await post(
      "/alading/api/statistics/getStatisticsAbAttendSumList",
      params
    );
    return result.data;
};
//根据学校ID年级ID班级ID查询统计考勤异常数据
export const getStatisticsList = async (params) => {
  let result = await post("/alading/api/statistics/getStatisticsAbAttendDetail", params);
  return result.data;
};