import Vue from "vue";
import md5 from "md5";
import qs from "qs";
import router from "./../routers/router";
//判断对象是否为json格式
export function isJson(obj) {
  var isjson =
    typeof obj == "object" &&
    Object.prototype.toString.call(obj).toLowerCase() == "[object object]" &&
    !obj.length;
  return isjson;
}
//参数序列化
export function urlParams(params) {
  return qs.stringify(params);
}
//密码加密
export function encryption(password) {
  return md5(password);
}
//session超时自动调回登录界面
export function sessionOut() {
  setTimeout(function() {
    router.push({ path: "/login" });
  }, 2000);
}
//验证码倒数计时
export function restTime(id) {
  var resetbtn = document.getElementById(id),
    count = 30,
    iTimer = 0,
    ibtn = true;
  if (ibtn) {
    ibtn = false;
    clearInterval(iTimer);
    resetbtn.setAttribute("disabled", "true");
    resetbtn.style.backgroundColor = "#ccc";
    // resetbtn.style.cursor = 'not-allowed';
    resetbtn.style.pointerEvents = "none";
    iTimer = setInterval(() => {
      if (count == 1) {
        resetbtn.innerHTML = "重新发送";
        clearInterval(iTimer);
        ibtn = true;
        resetbtn.removeAttribute("disabled");
        resetbtn.removeAttribute("disable");
        resetbtn.style.backgroundColor = "";
        // resetbtn.style.cursor = 'pointer';
        resetbtn.style.pointerEvents = "";
        return false;
      }
      resetbtn.innerHTML = "发送(" + --count + ")";
    }, 1000);
  }
}
//数据是否存在
export function messageEcho(oldValue, newValue) {
  for (let i = 0; i < oldValue.length; i++) {
    if (
      oldValue[i].contactName === newValue.contactName &&
      oldValue[i].contactAccount === newValue.contactAccount
    ) {
      return true;
    }
  }
  return false;
}
//计算时间差相隔天数
export function surplusDay(startData, endDtata) {
  return (
    (new Date(endDtata).getTime() - new Date(startData).getTime()) /
    (24 * 60 * 60 * 1000)
  );
}
//计算时间差 耗时
export function timeConsuming(startData, endDtata) {
  let dateTime = new Date(endDtata).getTime() - new Date(startData).getTime();
  let hour = new Date(dateTime).getHours();
  let minutes = new Date(dateTime).getMinutes();
  return hour + "时" + minutes + "分钟";
}
//日期格式化
export function formDate(date, format) {
  var args = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
}
//获取token值
export function token() {
  return sessionStorage.getItem("TOKEN");
}
//下载文件
export function dowandFile(res, fileName) {
  let blob = new Blob([res])
  if ('download' in document.createElement('a')) {
    let a = window.document.createElement('a')
    let url = null
    if ('msSaveOrOpenBlob' in navigator) {
      url = window.navigator.msSaveOrOpenBlob(res, fileName)
    } else {
      url = window.URL.createObjectURL(blob)
    }
    a.addEventListener('click', function(e) {
      a.download = fileName
      a.href = url
    })
    let e = document.createEvent('MouseEvents')
    e.initEvent('click', false, false)
    a.dispatchEvent(e)
    window.URL.revokeObjectURL(url)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}
export function upladFile(e, size) {
  let files = e.target.files || e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].size / 1024 / 1024 > size) {
      Vue.prototype.$message.warning("上传文件不得大于" + size + "M");
      return false;
    }
    let reg = /[^.]*.([^.]*)/;
    let fileType = files[i].name.replace(reg, "$1");
    if (fileType != "xls" && fileType != "xlsx") {
      Vue.prototype.$message.warning("请上传xls,xlsx格式文件");
      return false;
    }
  }
  return files;
}
//时间格式化
export function dateTime(time) {
  let timeStr = time.split(":");
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  return new Date(2016, 9, 10, 18, 40);
}
//樹形菜單項去掉權限標記
export function dataCode(val) {
  let reg = /[^:]*:([^:]*)/;
  if (val !== "") {
    return val.replace(reg, "$1");
  } else {
    return "";
  }
}
//判断当前是否是pc端或手机端
export function isPc() {
  if (/Android|webOS|iPhone|iPad|iPad|BlackBerry/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
// 大数据数字处理
export function outputdollars(number) {
  if (number.length <= 3) return number == "" ? "0" : number;
  else {
    var mod = number.length % 3;
    var output = mod == 0 ? "" : number.substring(0, mod);
    for (let i = 0; i < Math.floor(number.length / 3); i++) {
      if (mod == 0 && i == 0)
        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
      else output += "," + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return output;
  }
}
