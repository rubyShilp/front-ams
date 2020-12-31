import { post, get,postDownload } from "@/servers/httpServer.js";
//查询所有学生信息
export const queryStudent = async (params) => {
  let result = await post("/alading/api/student/getStudentsByPage", params);
  return result.data;
};
//创建学生
export const addStudent = async (params) => {
  let result = await post("/alading/api/student/createStudent",params);
  return result.data
}
//编辑学生
export const editStudent = async (params) => {
    let result = await post("/alading/api/student/updateStudentInfo",params);
    return result.data
}
//单个删除学生
export const delStudent = async (params) => {
    let result = await get("/alading/api/student/removeStu?stucode="+params);
    return result.data
}
//删除多个学生
export const delmoreStudent = async (params) => {
    let result = await get("/alading/api/student/batchRemoveStus?stucodes="+params);
    return result.data
}
//学生详情
export const detailStudent = async (params) => {
  let result = await post("/alading/api/student/getStudentDetail",params);
  return result.data
}
//导入学生列表
export const importStudents = async (params) => {
  let result = await post("/alading/api/student/importStudents",params);
  return result.data
}
//导入模板下载
export const download = async (params) => {
  let result = await postDownload("/alading/api/student/download",params);
  return result.data
}