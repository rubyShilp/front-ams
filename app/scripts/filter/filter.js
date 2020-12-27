import Vue from 'vue';
import {formDate} from './../util/core';
//日期格式化Date('yyyy年MM月dd日 hh:mm:ss')
Vue.filter('Date',function(value,format){
    return formDate(new Date(value),format);
});
Vue.filter('sexName',function(value){
    if(value==1){
        return '男';
    }else{
        return '女';
    }
})
Vue.filter('recordStatus',function(value){
    if(value==1){
        return '正常';
    }else{
        return '异常';
    }
})
Vue.filter('resourceType',function(value){
    if(value==1){
        return '按钮';
    }else{
        return '菜单';
    }
})
Vue.filter('resourceStatu',function(value){
    if(value==1){
        return '启用';
    }else{
        return '未启用';
    }
})
Vue.filter('userStatu',function(value){
    if(value==1){
        return '禁用';
    }else{
        return '正常';
    }
})
Vue.filter('schoolFil',function(value){
    if(value==0){
        return 'K12';
    }else if(value==1){
        return '中职';
    }else if(value==2){
        return '其他';
    }else{
        return '不详';
    }
})
Vue.filter('userTypeFil',function(value){
    if(value==0){
        return '超级管理员';
    }else if(value==1){
        return '普通管理员';
    }else if(value==2){
        return '教职工';
    }else{
        return '不详';
    }
})
Vue.filter('kaoqinStatu',function(value){
    switch (value) {
        case '0':
            value = "正常"
            break;
        case '1':
            value = "迟到"
            break;
        case '2':
            value = "早退"
            break;
        case '3': 
            value = "旷课"
            break;
        case '4':
            value = "请假"
            break;
    }
    return value;
})