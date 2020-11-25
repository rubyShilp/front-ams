import {post} from '@/servers/httpServer.js'
//登录
export const loginOut=async (params)=>{
    let result=await post('/alading/api/login/logout',params);
    return result.data;
}