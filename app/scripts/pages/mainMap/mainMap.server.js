import { post } from "@/servers/httpServer.js";
//获取省份数据
export const getAllProvinces = async (params) => {
    let result = await post("/alading/api/map/getAllProvinces", params);
    return result.data;
  };
//根据省份ID获取市区数据
export const getAllCitysByProvcode = async (params) => {
  let result = await post("/alading/api/map/getAllCitysByProvcode", params);
  return result.data;
};