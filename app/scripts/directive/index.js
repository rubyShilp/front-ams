import vue from 'vue';
import { Upload } from 'element-ui';
//清空上传文件信息
vue.directive('ams-file',()=>{
    upload:(el,banding,node)=>{
        el.value='';
    }
})
