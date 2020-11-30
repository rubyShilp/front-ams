import { post, get } from "@/servers/httpServer.js";
//查询所有学校
export const querySchool = async (params) => {
  let result = await post("/alading/api/school/getAllSchools", params);
  return result.data;
};
//创建学校
export const addSchool = async (params) => {
  let result = await post("/alading/api/school/createSchool",params);
  return result.data
}
//编辑学校
export const editSchool = async (params) => {
    let result = await post("/alading/api/school/updateSchoolInfo",params);
    return result.data
}
//单个删除学校
export const delSchool = async (params) => {
    let result = await get("/alading/api/school/removeSchool?schoolcode="+params);
    return result.data
}
//删除多个学校
export const delmoreSchool = async (params) => {
    let result = await get("/alading/api/school/batchRemoveSchool?schoolcodes="+params);
    return result.data
}
//学校详情
export const detailSchool = async (params) => {
  let result = await post("/alading/api/school/getSchoolDetail",params);
  return result.data
}