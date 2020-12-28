import { post } from "@/servers/httpServer.js";
//登录
export const login = async (params) => {
  let result = await post("/alading/api/login/login", params);
  return result.data;
};
//获取验证
export const smsSendCode = async (params) => {
  let result = await post("/alading/api/login/sms/send", params);
  return result.data;
};
//注册
export const registered = async (params) => {
  let result = await post("/alading/api/login/regist", params);
  return result.data;
};
//修改密码
export const retieve = async (params) => {
  let result = await post("/alading/api/user/set/loginPwd", params);
  return result.data;
};
