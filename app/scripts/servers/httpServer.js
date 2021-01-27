import axios from "axios";
import Vue from "vue";
import router from "./../routers/router.js";
import { token, sessionOut, isJson, urlParams } from "./../util/core.js";
axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf-8" || "multipart/form-data",
  "X-Frame-Options": "SAMEORIGIN",
};
axios.defaults.baseURL = "/";
//axios.defaults.withCredentials = true;
//请求拦截器
let num = 0;
axios.interceptors.request.use(
  (config) => {
    //根据所传参数的不同判断是否序列化参数
    // if (isJson(config.data)) {
    //   config.data = JSON.stringify(config.data);
    // }
    num++;
    if (token()) {
      config.headers.userKey = token();
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
//请求响应拦截器
axios.interceptors.response.use(
  (response) => {
    num--;
    if (response.status === 200) {
      if (response.data.status == 96) {
        if (num <= 0) {
          Vue.prototype.$message({
            type: "warning",
            message: response.data.message,
          });
          sessionStorage.removeItem("TOKEN");
          sessionStorage.removeItem("homeIndex");
          router.push("/login");
        }
        return response;
      }
      if (response.data.success === false) {
        Vue.prototype.$message({
          type: "warning",
          message: response.data.message,
        });
        return response;
      }
      return response;
    } else {
      sessionStorage.removeItem("TOKEN");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
//post请求
export function post(url, params) {
  return axios.post(url, params);
}
//get请求
export function get(url, params) {
  return axios.get(url, { params: params });
}
//上传
export function upload(url, params) {
  return axios.post(url, params);
}
//post下载文件
export function postDownload(url, params) {
  return axios.post(url, params, { responseType: "blob" });
}
