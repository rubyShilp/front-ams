import { post, get } from "@/servers/httpServer.js";
//查询当前用户的角色信息接口
export const queryRole = async (params) => {
    let result = await post("/alading/api/role/getAllRoles", params);
    return result.data;
};
//创建角色接口
export const addRole = async (params) => {
    let result = await post("/alading/api/role/createRole", params);
    return result.data;
};
//查询角色详情
export const detailRole = async (params) => {
    let result = await post("/alading/api/role/getRoleDetail", params);
    return result.data;
};
//编辑角色接口
export const editRole = async (params) => {
    let result = await post("/alading/api/role/updateRoleInfo", params);
    return result.data;
};
//批量删除角色信息接口
export const delmoreRole = async (params) => {
    let result = await get("/alading/api/role/batchRemoveRole?rolecodes="+params);
    return result.data;
};
//删除角色信息接口
export const delRole = async (params) => {
    let result = await get("/alading/api/role/removeRole?rolecode="+params);
    return result.data;
};
//分配角色给用户--查询（角色及学校、年级、班级的树）
export const editroletreeQuery = async (params) => {
    let result = await post("/alading/api/role/getUserRole", params);
    return result.data;
};
//分配角色给用户--保存
export const editroletreeSave = async (params) => {
    let result = await post("/alading/api/role/saveUserRelation", params);
    return result.data;
};
//查询当前用户的资源信息接口
export const queryuserResource = async (params) => {
    let result = await post("/alading/api/resource/getResources", params);
    return result.data;
};
//绑定角色与资源关系--保存
export const saveroleResource = async (params) => {
    let result = await post("/alading/api/role/saveRoleResource", params);
    return result.data;
};
//删除资源信息接口
export const delResource = async (params) => {
    let result = await get("/alading/api/resource/removeResource?resourcecode="+params);
    return result.data;
};
//批量删除资源信息接口
export const delmoreResource = async (params) => {
    let result = await get("/alading/api/resource/batchRemoveResource?resourcecodes=", params);
    return result.data;
};
//创建资源接口
export const addResource = async (params) => {
    let result = await post("/alading/api/resource/createResource", params);
    return result.data;
};
//编辑资源接口
export const editResource = async (params) => {
    let result = await post("/alading/api/resource/updateResourceInfo", params);
    return result.data;
};