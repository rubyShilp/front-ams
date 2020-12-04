import { post } from "@/servers/httpServer.js";
//登录
export const login = async (params) => {
  let result = await post("/alading/api/login/login", params);
  return result.data;
};
//注册
export const registered = async (params) => {
  let result = await post("/alading/api/login/regist", params);
  return result.data;
};
