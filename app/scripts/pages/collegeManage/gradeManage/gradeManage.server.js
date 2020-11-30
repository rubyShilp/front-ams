import { post, get } from "@/servers/httpServer.js";
//查询所有年级
export const queryGrade = async (params) => {
  let result = await post("/alading/api/grade/selectGradesById", params);
  return result.data;
};
//创建年级
export const addGrade = async (params) => {
  let result = await post("/alading/api/grade/createGrade",params);
  return result.data
}
//编辑年级
export const editGrade = async (params) => {
    let result = await post("/alading/api/grade/updateGradeInfo",params);
    return result.data
}
//单个删除年级
export const delGrade = async (params) => {
    let result = await get("/alading/api/grade/removeGrade?gradecode="+params);
    return result.data
}
//删除多个年级
export const delmoreGrade = async (params) => {
    let result = await get("/alading/api/grade/removeGrade?schoolcodes="+params);
    return result.data
}
//年级详情
export const detailGrade = async (params) => {
  let result = await post("/alading/api/grade/getGradeDetail",params);
  return result.data
}