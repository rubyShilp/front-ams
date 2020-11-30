import { post, get } from "@/servers/httpServer.js";
//查询所有班级
export const queryClass = async (params) => {
  let result = await post("/alading/api/clazz/selectClassById", params);
  return result.data;
};
//创建班级
export const addClass = async (params) => {
  let result = await post("/alading/api/clazz/createClass",params);
  return result.data
}
//编辑班级
export const editClass = async (params) => {
    let result = await post("/alading/api/clazz/updateClassInfo",params);
    return result.data
}
//单个删除班级
export const delClass = async (params) => {
    let result = await get("/alading/api/clazz/removeClass?classcode="+params);
    return result.data
}
//删除多个班级
export const delmoreClass = async (params) => {
    let result = await get("/alading/api/clazz/batchRemoveClasses?classcodes="+params);
    return result.data
}
//班级详情
export const detailClass = async (params) => {
  let result = await post("/alading/api/clazz/getClassDetail",params);
  return result.data
}